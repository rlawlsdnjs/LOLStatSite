import styled from "styled-components";
import { useEffect, useState } from "react";
import axios from "axios";
import { setLogLevel } from "firebase/firestore";
import LolSearchResult from "../components/lol/search/LolSearchResult";
import { userDataState, searchKeyState } from "../store/lol";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import React from "react";
import Loading from "../components/Loading";

import getDetailMatch from "../../api/lolDetailMatch";
const SearchLol = () => {
	const currentSearchKey = useRecoilValue(searchKeyState);
	const riotApi = import.meta.env.VITE_RIOT_API_KEY;
	const remote = axios.create();
	const [lolUser, setLolUser] = useRecoilState<any>(userDataState);
	// const [userState, setUserState] = useState({});

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
			const matchValue = Object.values(matchInfo.data);

			const matchArr: any = [];

			for (let i = 0, len = 20; i < len; i++) {
				matchArr.push(
					remote.get(`/api/lol/match/v5/matches/${matchValue[i]}`, {
						headers: {
							"X-Riot-Token": riotApi,
						},
					})
				);
			}
			console.log(matchArr);
			const gdgd = { data: "KR_6465224477" };
			const options = {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(gdgd),
			};
			const response = await fetch("/api/lolDetailMatch", options);
			const result = response.json();
			console.log("serverless", result);
			// console.log(gd);
			const allMatch: any = await Promise.all(matchArr)
				.then((responses) => {
					return responses;
				})
				.catch((error) => {
					console.log(error);
				});
			console.log("allmatch", allMatch);
			console.log(true);
			const participants = allMatch.map((match: any) => {
				return match.data.info.participants;
			});

			// const gd: any = [];
			// const currentUserMatchInfo: any = participants?.forEach(
			// 	(user: any, idx: number) => {
			// 		user.reduce((ac: any, name: any) => {
			// 			if (name.summonerName == currentSearchKey) {
			// 				gd.push(name);
			// 			}
			// 		});
			// 		return;
			// 	}
			// );

			// console.log(gd);

			setLolUser({
				id: userInfo.data.id,
				userInfo: userInfo.data,
				rankInfo: rankInfo.data[0],
				matchInfo: matchInfo.data,
				mostChampInfo: champInfo.data[0].championId,
				matchID: matchArr,
				allMatch: allMatch,
			});
			// const match = Object.values(lolUser?.matchInfo);

			// 매치 별 정보
			// const matchArr: any = [];
			// console.log("match", Object.values(lolUser?.matchInfo));
			// if (matchArr.length <= matchInfo.data.length) {
			// 	for (let i = 0, len = 20; i < len; i++) {
			// 		matchArr.push(
			// 			remote.get(`/api/lol/match/v5/matches/${matchInfo.data[i]}`, {
			// 				headers: {
			// 					"X-Riot-Token": riotApi,
			// 				},
			// 			})
			// 		);
			// 	}
			// 	console.log("배열푸쉬", matchArr);
			// 	await Promise.all(matchArr)
			// 		.then((responses: any) => {
			// 			matchResult.push(responses);
			// 			console.log("위결과", matchResult);
			// 			if (matchResult.length != 0) {
			// 				currentUser(matchResult);
			// 			}
			// 		})
			// 		.catch((error) => {
			// 			console.log(error);
			// 		});

			// 	return;
			// }

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
