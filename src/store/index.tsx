import { atom, selector } from "recoil";
import SearchLol from "../hooks/SearchLol";
import { RecoilValueReadOnly } from "recoil";
import axios from "axios";
const riotApi = import.meta.env.VITE_RIOT_API_KEY;

export const loginState = atom({
  key: "loginState",
  default: false,
});

export const searchState = atom({
  key: "SearchState",

  default: false,
});

export const searchKeyState = atom<string>({
  key: "searchKeyState",
  default: "",
});

export interface IlolUser {
  id: string;
  userInfo: object;
  matchInfo: object;
  rankInfo: object;
}

export const userDataState: any = atom<IlolUser>({
  key: "userDataState",
  default: {
    id: "",
    userInfo: {},
    matchInfo: {},
    rankInfo: {},
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

import { getDepOptimizationConfig } from "vite";

export const userMatchState: any = selector({
  key: "userMatchState",
  get: async ({ get }) => {
    const userMatchInfo = get<any>(userDataState);
    const match = Object.values(userMatchInfo.matchInfo);
    const remote = axios.create();
    const matchArr: any = [];
    const matchResult: any = [];

    for (let i = 0, len = match.length; i < len; i++) {
      matchArr.push(
        remote.get(`/api/lol/match/v5/matches/${match[i]}`, {
          headers: {
            "X-Riot-Token": riotApi,
          },
        })
      );
    }

    await Promise.all(matchArr)
      .then((responses) => {
        matchResult.push(responses);

        return;
      })
      .catch((error) => {
        console.log(error);
      });
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

    return matchResult;

    // return matchArr
  },
});
