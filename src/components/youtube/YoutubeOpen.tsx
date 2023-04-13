import React, { useState } from "react";
import { useRecoilValue } from "recoil";
import { YoutubeResult } from "../../store/youtube";
import YoutubeList from "./YoutubeList";
import styled, { keyframes } from "styled-components";
import YoutubeLogo from "../../../public/assets/youtubeBtn.png";
const YoutubeOpen = () => {
	const [youtubeOpen, setYoutubeOPen] = useState(false);
	const openYoutube = () => {
		setYoutubeOPen((prev) => !prev);
	};
	const youtubeSearch = useRecoilValue(YoutubeResult);
	return (
		<YoutubeSection>
			<YoutubeBtn onClick={openYoutube}>
				<img src={YoutubeLogo} />
			</YoutubeBtn>
			{youtubeOpen && <YoutubeList />}
		</YoutubeSection>
	);
};
const aniBtn = keyframes`
	from {
		top:5px;
	}

	to {
		top:0px;
	}
`;
const YoutubeBtn = styled.button`
	animation: ${aniBtn} 1s 2s infinite alternate linear;
	margin-bottom: 3vw;
	margin-right: 3vw;
	position: relative;
	border-radius: 50%;
	padding: 10px;
	background: rgba(255, 255, 255, 0.9);
	cursor: pointer;
	box-shadow: 3px 3px 20px #000;
	& img {
		max-width: 5vw;
	}
`;
const YoutubeSection = styled.div`
	position: fixed;
	z-index: 100;
	bottom: 0;
	left: 0;
	width: 100%;
	text-align: right;
`;
export default YoutubeOpen;
