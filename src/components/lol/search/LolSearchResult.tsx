import { useRecoilValue, useRecoilValueLoadable } from "recoil";
import { searchState, userDataState, userMatchState } from "../../../store/lol";
import Profile from "../profile/Profile";
import UserMatch from "../match/Match";
import styled, { keyframes } from "styled-components";
import tw from "tailwind-styled-components";
import { useEffect, useState } from "react";

const LolSearchResult = () => {
	const userData = useRecoilValue<any>(userDataState);
	const matchInfo = useRecoilValue<any>(userMatchState);
	const [gd, setgd] = useState([]);
	useEffect(() => {
		setgd(matchInfo[0]);
	}, [matchInfo]);

	return (
		<>
			<ResultWrap id={userData.id}>
				<Profile />
				{gd.length != 0 ? <UserMatch /> : null}
			</ResultWrap>
		</>
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
