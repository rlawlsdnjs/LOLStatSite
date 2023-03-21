import { useEffect, useState } from "react";
import { useRecoilValue, useRecoilValueLoadable } from "recoil";
import { searchState, userDataState, lolUserDataState } from "../../../store";
import SearchLol from "../../../hooks/SearchLol";
import { searchKeyState } from "../../../store";
import React from "react";

const LolSearchResult = () => {
  const user = useRecoilValue<any>(lolUserDataState);
  console.log(user);
  const tierImg = `/public/assets/icons/tier-base-icons/${user.rankInfo.tier}.png`;
  return (
    <>
      {user.id && (
        <>
          <p>{user.userInfo.name}</p>

          <img
            src={`http://ddragon.leagueoflegends.com/cdn/13.5.1/img/profileicon/${user.userInfo.profileIconId}.png`}
          ></img>
          <img
            src={
              user.rankInfo == undefined
                ? `../../assets/icons/tier-base-icons/provisional.png`
                : `${tierImg}`
            }
          ></img>
        </>
      )}
    </>
  );
};

export default LolSearchResult;
