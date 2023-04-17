import styled from "styled-components";
import { useEffect, useState } from "react";
import axios from "axios";
import { setLogLevel } from "firebase/firestore";
import LolSearchResult from "../components/lol/search/LolSearchResult";
import { userDataState, searchKeyState, userMatchState } from "../store/lol";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import React from "react";
import Loading from "../components/Loading";
const SearchLol = () => {
	const currentSearchKey = useRecoilValue(searchKeyState);
	const riotApi = import.meta.env.VITE_RIOT_API_KEY;
	const remote = axios.create();
	const [lolUser, setLolUser] = useRecoilState<any>(userDataState);
	const setUser = useSetRecoilState(userDataState);
	const [userState, setUserState] = useState({});
	const [matchResult, setMatchResult] = useState<any>([]);
	const currentUserMatch: any = [];

	const lolAllData = async () => {
		try {
			const userUrl =
				`https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-name/${currentSearchKey}` +
				"?api_key=" +
				riotApi;
			const userInfo = await remote.get(userUrl);
			const userAccountId = userInfo.data.accountId;
			const userPuuId = userInfo.data.puuid;
			const userId = userInfo.data.id;
			const userRankhUrl =
				`https://kr.api.riotgames.com/lol/league/v4/entries/by-summoner/${userId}` +
				"?api_key=" +
				riotApi;
			const rankInfo = await remote.get(userRankhUrl);
			const matchInfo: any = await remote.get(
				`/api/lol/match/v5/matches/by-puuid/${userPuuId}/ids?start=0&count=20`,
				{
					headers: {
						"X-Riot-Token": riotApi,
					},
				}
			);

			const champInfoUrl =
				`https://kr.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-summoner/${userId}` +
				"?api_key=" +
				riotApi;
			const champInfo = await remote.get(champInfoUrl);
			setLolUser({
				id: userInfo.data.id,
				userInfo: userInfo.data,
				rankInfo: rankInfo.data[0],
				matchInfo: matchInfo.data,
				mostChampInfo: champInfo.data[0].championId,
			});
			console.log(matchInfo.data);
			// const match = Object.values(lolUser?.matchInfo);

			// 매치 별 정보
			const matchArr: any = [];
			// console.log("match", Object.values(lolUser?.matchInfo));
			if (matchArr.length <= matchInfo.data.length) {
				for (let i = 0, len = 20; i < len; i++) {
					matchArr.push(
						remote.get(`/api/lol/match/v5/matches/${matchInfo.data[i]}`, {
							headers: {
								"X-Riot-Token": riotApi,
							},
						})
					);
				}
				console.log("배열푸쉬", matchArr);
				await Promise.all(matchArr)
					.then((responses) => {
						setMatchResult([responses]);
						console.log("위결과", matchResult);

						return;
					})
					.catch((error) => {
						console.log(error);
					});
			}

			// async function fetchItems(match: any) {
			//   match.map((item: any) => {
			//     axios
			//       .get(`/api/lol/match/v5/matches/${item}`, {
			//         headers: {
			//           "X-Riot-Token": riotApi,
			//         },
			//       })
			//       .then((res) => {
			//         console.log(res);
			//       });
			//   });

			//   // const responses = await Promise.all(requests);
			//   // const responses = await requests

			//   // return console.log(responses.map(response => response));
			// }
			// fetchItems(match);
		} catch (error) {
			console.log(`Error: ${error}`);
		}
	};
	const currentUser = () => {
		matchResult[0].forEach((match: any) => {
			console.log("현재유저 판별", match);
			match.data.info.participants.forEach((user: any) => {
				if (user.summonerName == currentSearchKey) {
					currentUserMatch.push(user);
				}
			});
		});
	};
	if (matchResult.length > 0 && matchResult.length <= 20) {
		currentUser();
	}
	console.log("아래결과", matchResult);
	if (currentUserMatch.length == 20) {
		console.log("검색유저", currentUserMatch);
	}

	useEffect(() => {
		const LolKeyword = "LolKeyword";
		if (currentSearchKey == "null") {
			return;
		} else {
			sessionStorage.setItem(LolKeyword, currentSearchKey);
			lolAllData();
		}
	}, [currentSearchKey]);

	// return (
	// 	<>
	// 		<React.Suspense fallback={<Loading />}>
	// 			{currentSearchKey == "null" ? null : <LolSearchResult />}
	// 		</React.Suspense>
	// 	</>
	// );
};

export default SearchLol;
