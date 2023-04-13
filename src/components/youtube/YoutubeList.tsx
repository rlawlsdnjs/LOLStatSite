import { useRecoilValue } from "recoil";
import { useRecoilState } from "recoil";
import { YoutubeResult } from "../../store/youtube";
import { YoutubeSearchKeyState } from "../../store/youtube";
import { Swiper, SwiperSlide } from "swiper/react";
import { useState } from "react";
import { Navigation } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import styled, { keyframes } from "styled-components";
const YoutubeList = () => {
	const youtubeSearchList: [] | any = useRecoilValue(YoutubeResult);
	console.log(youtubeSearchList);

	const [yotubeKeyword, setYotubeKeyword] = useState("");
	const [youtubeSearch, setYoutubeSearch] = useRecoilState(
		YoutubeSearchKeyState
	);

	const changehKeyword = (e: React.ChangeEvent<HTMLInputElement>) => {
		e.preventDefault();
		setYotubeKeyword(e.target.value);
	};

	const keywordChange = () => {
		setYoutubeSearch(yotubeKeyword);
	};

	const handleOnKeyPress = (e: React.KeyboardEvent) => {
		if (e.key === "Enter") {
			setYoutubeSearch(yotubeKeyword);
		}
	};

	return (
		<YoutubeArea>
			<div className="text-center pt-5 flex justify-center">
				<input
					onChange={changehKeyword}
					onKeyDown={handleOnKeyPress}
					placeholder="영상을 입력 해주세요."
				></input>
				<button onClick={keywordChange}>검색</button>
			</div>
			{youtubeSearchList == null ? (
				<NullArea>
					<p>검색창에 YOUTUBE 영상을 검색 해보세요!</p>
				</NullArea>
			) : (
				<div className="max-w-screen-xl p-5 mx-auto">
					<main>
						<Swiper
							spaceBetween={50}
							slidesPerView={1.5}
							onSlideChange={() => console.log("slide change")}
							onSwiper={(swiper) => console.log(swiper)}
							modules={[Navigation]}
							navigation
							breakpoints={{
								480: {
									slidesPerView: 1.5,
								},
								768: {
									slidesPerView: 2.5,
								},
								1025: {
									slidesPerView: 3.5,
								},
							}}
						>
							{youtubeSearchList.map((video: any, index: number) => {
								let videosUrl = `https://www.youtube.com/embed/${video.id.videoId}`;
								return (
									<SwiperSlide key={video.id.videoId} virtualIndex={index}>
										<iframe
											width="300"
											height="180"
											src={videosUrl}
											title={`${video.snippet.title}`}
											frameBorder="0"
											allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
											allowFullScreen
										></iframe>
									</SwiperSlide>
								);
							})}
						</Swiper>
					</main>
				</div>
			)}
		</YoutubeArea>
	);
};

const aniYoutube = keyframes`
	from {
		height:0px;
	}

	to {
		height:200px;
	}
`;
const YoutubeArea = styled.div`
	background: rgba(0, 0, 0, 0.9);
	animation: ${aniYoutube} 0.4s linear;
	& input {
		width: 20vw;
		height: 50px;
		border: 2px solid #fff;
		border-radius: 10px 0px 0px 10px;
		color: #fff;
		background: rgba(255, 255, 255, 0.3);
		text-indent: 15px;
		border-right: none;
		box-sizing: border-box;
	}
	& input:focus {
		outline: none;
	}
	& button {
		background: rgb(0, 0, 0);
		border: 2px solid #fff;
		color: transparent;
		-webkit-text-stroke: 1px rgb(255, 255, 255);
		font-size: 20px;
		font-weight: bold;
		border-radius: 0px 10px 10px 0px;
		box-sizing: border-box;
	}
	& > button {
		height: 50px;
		padding: 0 20px;
	}
`;
const NullArea = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	min-height: 200px;
	-webkit-text-stroke: 2px rgb(255, 255, 255);
	font-size: 25px;
	font-weight: 800;
	color: transparent;
`;

export default YoutubeList;
