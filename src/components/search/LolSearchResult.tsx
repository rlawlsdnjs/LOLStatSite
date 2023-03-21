import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { searchState, userDataState, lolUserDataState } from "../../store";
import SearchLol from "../../hooks/SearchLol";
import { searchKeyState } from "../../store";
import { IlolUser } from "../../store";

const LolSearchResult = () => {
  const user = useRecoilValue<any>(lolUserDataState);

  console.log(user);
  return (
    <>
      <p>{user.id}</p>
      <img
        src={`http://ddragon.leagueoflegends.com/cdn/13.5.1/img/profileicon/${user.userInfo.profileIconId}.png`}
      ></img>
    </>
  );
};

export default LolSearchResult;
