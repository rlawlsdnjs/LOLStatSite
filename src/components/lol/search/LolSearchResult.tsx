import { useRecoilValue, useRecoilValueLoadable } from "recoil";
import {
	searchKeyState,
	userDataState,
	lolUserDataState,
	userMatchState,
	// userMatchUrlState,
	// currentMatchParticipantsState,
	// currentUserMatchState,
} from "../../../store/lol";
import Profile from "../profile/Profile";
import UserMatch from "../match/Match";
import styled, { keyframes } from "styled-components";
import tw from "tailwind-styled-components";
import React, { useEffect, useState } from "react";
import { useMemo } from "react";
import SearchLol from "../../../service/SearchLol";
import LolSearch from "./LolSearch";
import Loading from "../../Loading";
import { Suspense } from "react";

const LolSearchResult = () => {
	// const currentMatchParticipants = useRecoilValue(
	// 	currentMatchParticipantsState
	// );
	// console.log(currentMatchParticipants);
	const currentUserMatch = useRecoilValueLoadable<any>(userMatchState);
	console.log("loadlable", currentUserMatch);

	// 로딩 상태 처리
	if (currentUserMatch.state === "loading") {
		return <Loading></Loading>;
	}

	return (
		<ResultWrap>
			<Profile />
			<UserMatch />
		</ResultWrap>
	);
};
const aniSearch = keyframes`
	from {
		opacity:0;
	}

	to {
		opacity:1;
	}
`;
const twResultWrap = styled.div<any>`
	animation: ${aniSearch} 0.7s linear;
	max-height: 700px;
	height: 75vh;
	display: flex;
	padding: 3rem;
	flex-wrap: wrap;
	box-sizing: border-box;
	background: rgbA(255, 255, 255, 0.9);
	border: 2px solid #000;
	box-shadow: 2px 1px 16px #000;
	border-radius: 10px;
	&::-webkit-scrollbar {
		width: 5px;
		border-radius: 6px;
	}
	&::-webkit-scrollbar-thumb {
		height: 30%;
		background: #000;

		border-radius: 10px;
	}

	&::-webkit-scrollbar-track {
		background: transparent;
	}
`;

const ResultWrap = tw(twResultWrap)<any>`
  overflow-y-scroll
  max-w-screen-xl
  md:overflow-hidden
  w-full
  justify-evenly
`;
export default LolSearchResult;
