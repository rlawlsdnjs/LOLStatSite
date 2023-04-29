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

export interface IlolUser {
	id: string;
	userInfo: object;
	matchInfo: object;
	rankInfo: object;
	matchID: object;
	allMatch: object;
}

export const userDataState: any = atom<IlolUser>({
	key: "userDataState",
	default: {},
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

// export const userMatchState: any = selector({
// 	key: "userMatchState",
// 	get: async ({ get }) => {
// 		const matchArr = get<any>(userDataState);
// 		const matchValue = Object.values(matchArr.matchID);
// 		return await Promise.all(matchValue)
// 			.then((responses) => {
// 				return responses;
// 			})
// 			.catch((error) => {
// 				console.log(error);
// 			});
// 	},
// });
// export const currentMatchParticipantsState: any = selector({
// 	key: "currentMatchParticipantsState",
// 	get: async ({ get }) => {
// 		const currentUserMatch = get<any>(userDataState);
// 		console.log("recoil", currentUserMatch);
// 		return currentUserMatch?.allMatch.map((match: any) => {
// 			return match?.data?.info?.participants;
// 		});
// 	},
// });

// export const currentUserMatchState: any = selector({
// 	key: "currentUserMatchState",
// 	get: ({ get }) => {
// 		const currentSearchKey = get(searchKeyState);
// 		const currentUserMatch = get<any>(currentMatchParticipantsState);
// 		const gd: any = [];
// 		const currentUserMatchInfo: any = currentUserMatch?.forEach(
// 			(user: any, idx: number) => {
// 				user.reduce((ac: any, name: any) => {
// 					if (name.summonerName == currentSearchKey) {
// 						gd.push(name);
// 					}
// 				});
// 				return;
// 			}
// 		);

// 		return gd;
// 	},
// });

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
