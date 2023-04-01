import { useEffect, useState } from "react";
import { useRecoilValue, useRecoilValueLoadable } from "recoil";
import { searchState, userDataState, lolUserDataState } from "../../../store";
import SearchLol from "../../../hooks/SearchLol";
import { searchKeyState } from "../../../store";
import React from "react";

import Profile from "../profile/Profile";
import UserMatch from "../match/Match";
import styled from "styled-components";

import tw from "tailwind-styled-components";

const LolSearchResult = () => {
  return (
    <ResultWrap>
      <Profile />
      <UserMatch />
    </ResultWrap>
  );
};

const twResultWrap = styled.div<any>`
  height: 85vh;
  overflow-y: scroll;
  display: flex;
`;

const ResultWrap = tw(twResultWrap)<any>`
  max-w-screen-xl
  w-full
`;
export default LolSearchResult;
