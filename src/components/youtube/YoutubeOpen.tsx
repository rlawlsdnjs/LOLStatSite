import { useState } from "react";
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
			<YoutubeBtn
				onClick={openYoutube}
				role="button"
				aria-label="Youtube 검색창 on/off 버튼"
			>
				<img src={YoutubeLogo} />
			</YoutubeBtn>
			{youtubeOpen && <YoutubeList />}
		</YoutubeSection>
	);
};
const aniBtn = keyframes`
	from {
		opacity:0.5;
	}

	to {
		opacity:0.1;
	}
`;
const YoutubeBtn = styled.button`
	// animation: ${aniBtn} 0.5s 1s infinite alternate linear;
	margin-bottom: 3vw;
	margin-right: 3vw;
	position: absolute;
	border-radius: 50%;
	padding: 10px;
	top: -95px;
	right: 0;
	width: 70px;
	height: 70px;
	display: block;
	background: rgba(255, 255, 255, 0.9);
	cursor: pointer;
	box-shadow: 3px 3px 20px #000;
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
