import { useEffect } from "react";
import axios from "axios";
import { userDataState, searchKeyState } from "../store/lol";
import { useRecoilState, useRecoilValue } from "recoil";

import LolSearchResult from "../components/lol/search/LolSearchResult";

const SearchLol = () => {
	const currentSearchKey = useRecoilValue(searchKeyState);
	const riotApi = import.meta.env.VITE_RIOT_API_KEY;
	const remote = axios.create();
	const [lolUser, setLolUser] = useRecoilState<any>(userDataState);

	const lolAllData = async () => {
		try {
			const userUrl =
				`https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-name/${currentSearchKey}` +
				"?api_key=" +
				riotApi;
			const userInfo = await remote.get(userUrl);
			const userAccountId = userInfo.data.accountId;
			const userPuuId = userInfo.data.puuid;
			console.log(userPuuId);
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
				puuID: userPuuId,
			});
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

	return <>{currentSearchKey == "null" ? null : <LolSearchResult />} </>;
};

export default SearchLol;
