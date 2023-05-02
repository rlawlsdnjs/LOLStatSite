import { atom, selector } from "recoil";

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
	default: {
		id: "",
		userInfo: {},
		matchInfo: {},
		rankInfo: {},
		matchID: {},
		allMatch: {},
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
		const userData = get<any>(userDataState);
		const userPuu = {
			data: `${userData.puuID}`,
		};
		const matchOptions: RequestInit = {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(userPuu),
		};

		// serverless functions 요청
		const userMatchList = await fetch("/api/lolUserMatch", matchOptions);
		const userMatchListResult = await userMatchList.json();

		return userMatchListResult;
	},
});

export const favoriteState = atom({
	key: "favoriteState",
	default: [],
});
