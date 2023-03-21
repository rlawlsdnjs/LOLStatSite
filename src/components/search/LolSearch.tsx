import styled from "styled-components";
import React, { useEffect, useState } from "react";
import { setLogLevel } from "firebase/firestore";
import { searchKeyState } from "../../store";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import SearchLol from "../../hooks/SearchLol";
import LolSearchResult from "./LolSearchResult";
import { Link } from "react-router-dom";

const LolResult = () => {
  const [lolSearch, setLolSearch] = useRecoilState(searchKeyState);
  const [userSearch, setUserSearch] = useState("");
  const changehId = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setUserSearch(e.target.value);
  };

  const keywordChange = () => {
    setLolSearch(userSearch);
  };

  return (
    <>
      <SearchForm>
        <input
          type="search"
          placeholder="소환사명을 입력 해주세요."
          onChange={changehId}
        />
        <button onClick={keywordChange}>검색</button>
        <button onClick={keywordChange}>전적갱신</button>
      </SearchForm>
    </>
  );
};

const SearchForm = styled.div``;
const Lolresult = styled.div``;

export default LolResult;
