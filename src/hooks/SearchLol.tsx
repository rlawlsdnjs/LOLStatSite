import styled from "styled-components";
import { useEffect, useState } from "react";
import axios from "axios";
import { setLogLevel } from "firebase/firestore";
import LolSearchResult from "../components/lol/search/LolSearchResult";
import {
  searchState,
  userDataState,
  searchKeyState,
  userMatchState,
} from "../store";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import React from "react";
const SearchLol = () => {
  const currentSearchKey = useRecoilValue(searchKeyState);

  const riotApi = import.meta.env.VITE_RIOT_API_KEY;
  const remote = axios.create();
  //   const [search, setSearch] = useRecoilState(searchState);
  //   const seachValue = useRecoilValue(searchState);
  const [lolUser, setLolUser] = useRecoilState<any>(userDataState);
  const setUser = useSetRecoilState(userDataState);
  const LolUser = useRecoilValue<any>(userDataState);

  const [userState, setUserState] = useState({});
  //   console.log(LolUser);

  // const matchInfo = useRecoilValue(userMatchState);

  const lolAllData = async () => {
    try {
      const userUrl =
        `https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-name/${currentSearchKey}` +
        "?api_key=" +
        riotApi;
      const userInfo = await remote.get(userUrl);
      console.log(userInfo.data);
      //   setLolUser(userInfo.data);
      //   console.log(LolUser);
      const userAccountId = userInfo.data.accountId;
      const userPuuId = userInfo.data.puuid;
      const userId = userInfo.data.id;
      const userRankhUrl =
        `https://kr.api.riotgames.com/lol/league/v4/entries/by-summoner/${userId}` +
        "?api_key=" +
        riotApi;
      const rankInfo = await remote.get(userRankhUrl);
      console.log(rankInfo.data[0]);
      const matchInfo = await remote.get(
        `/api/lol/match/v5/matches/by-puuid/${userPuuId}/ids?start=0&count=20`,
        {
          headers: {
            "X-Riot-Token": riotApi,
          },
        }
      );
      console.log(matchInfo.data);

      const champInfoUrl =
        `https://kr.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-summoner/${userId}` +
        "?api_key=" +
        riotApi;
      const champInfo = await remote.get(champInfoUrl);
      // console.log(champInfo);
      setLolUser({
        id: userInfo.data.id,
        userInfo: userInfo.data,
        rankInfo: rankInfo.data[0],
        matchInfo: matchInfo.data,
      });

      //   {
      //     userAccountId != null ? setSearch(true) : setSearch(false);
      //   }
    } catch (error) {
      console.log(`Error: ${error}`);
    }
  };

  return <>{currentSearchKey ? <LolSearchResult /> : null}</>;
};

export default SearchLol;
