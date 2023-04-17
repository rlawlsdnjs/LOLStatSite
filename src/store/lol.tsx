import { atom, selector, useRecoilValue } from "recoil";
import SearchLol from "../service/SearchLol";
import { RecoilValueReadOnly } from "recoil";
import axios from "axios";
import { useEffect } from "react";
const riotApi = import.meta.env.VITE_RIOT_API_KEY;

export const loginState = atom({
	key: "loginState",
	default: false,
});

const LolKeyword = "LolKeyword";
export const searchKeyState = atom<string>({
	key: "searchKeyState",
	default: `${sessionStorage.getItem(LolKeyword)}`,
});

export const lolSearchChange = selector({
	key: "lolSearchChange",
	get: ({ get }) => {
		const currentSearchKey = get<string>(searchKeyState);
		console.log(currentSearchKey);
		return console.log(1);
	},
});

export interface IlolUser {
	id: string;
	userInfo: object;
	matchInfo: object;
	rankInfo: object;
	matchID: object;
}

export const userDataState: any = atom<IlolUser>({
	key: "userDataState",
	default: {
		id: "",
		userInfo: {},
		matchInfo: {},
		rankInfo: {},
		matchID: {},
	},
});

export const lolUserDataState = selector({
	key: "lolUserData",
	get: ({ get }) => {
		const userData = get(userDataState);
		if (userData) {
			return userData;
		}
	},
});

export const userMatchState: any = selector({
	key: "userMatchState",
	get: async ({ get }) => {
		const matchArr = get<any>(userDataState);
		const matchValue = Object.values(matchArr.matchID);
		return await Promise.all(matchValue)
			.then((responses) => {
				return responses;
			})
			.catch((error) => {
				console.log(error);
			});
	},
});
export const currentMatchParticipantsState: any = selector({
	key: "currentMatchParticipantsState",
	get: ({ get }) => {
		const currentUserMatch = get<any>(userMatchState);

		return currentUserMatch.map((match: any) => {
			return match.data?.info?.participants;
		});
	},
});

export const currentUserMatchState: any = selector({
	key: "currentUserMatchState",
	get: ({ get }) => {
		const currentSearchKey = get(searchKeyState);
		const currentUserMatch = get<any>(currentMatchParticipantsState);
		// const currentMatch =
		// currentUserMatchArr.push(currentMatch);
		// currentUserMatchArr.forEach((user: any) => {
		// 	if (user.summonerName == currentSearchKey) {
		// 		currentResultArr.push(user);
		// 	}
		// });
		const matchValue = Object.values(userMatchState);
		const currentUserMatchInfo: any = [];
		currentUserMatch.forEach((user: any) => {
			console.log(user);
			const userFilter = user.filter(
				(user: any) => user.summonerName == currentSearchKey
			);
			currentUserMatchInfo.push(userFilter);
		});
		return currentUserMatchInfo;
	},
});

export const favoriteState = atom({
	key: "favoriteState",
	default: [],
});

// export const userMatchUrlState: any = selector({
// 	key: "userMatchUrlState",
// 	get: ({ get }) => {
// 		const userMatchInfo = get<any>(userDataState);

// 		const matchValue = Object.values(userMatchInfo.matchInfo);
// 		console.log(matchValue);
// 		const remote = axios.create();
// 		const matchArr: any = [];

// 		for (let i = 0, len = 20; i < len; i++) {
// 			matchArr.push(
// 				remote.get(`/api/lol/match/v5/matches/${matchValue[i]}`, {
// 					headers: {
// 						"X-Riot-Token": riotApi,
// 					},
// 				})
// 			);
// 		}

// 		// async function fetchItems(match: any) {
// 		//   match.map((item: any) => {
// 		//     axios
// 		//       .get(`/api/lol/match/v5/matches/${item}`, {
// 		//         headers: {
// 		//           "X-Riot-Token": riotApi,
// 		//         },
// 		//       })
// 		//       .then((res) => {
// 		//         console.log(res);
// 		//       });
// 		//   });

// 		//   // const responses = await Promise.all(requests);
// 		//   // const responses = await requests

// 		//   // return console.log(responses.map(response => response));
// 		// }
// 		// fetchItems(match);

// 		return matchArr;
// 	},
// });
