import { useEffect, useState } from "react";
import { useRecoilValue, useRecoilValueLoadable } from "recoil";
import { searchState, userDataState, lolUserDataState } from "../../../store";
import SearchLol from "../../../hooks/SearchLol";
import { searchKeyState } from "../../../store";
import React from "react";

import Profile from "../profile/Profile";
import UserMatch from "../match/Match";

const LolSearchResult = () => {
  return (
    <>
      <Profile />
      <UserMatch />
    </>
  );
};

export default LolSearchResult;
