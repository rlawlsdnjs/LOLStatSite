import { useState } from "react";
import React, { useContext } from "react";
import { AuthContext } from "./components/sign/context/authContext";
import { SignUp } from "./components/sign/sign";
import Header from "./layouts/Header";
import { loginState, searchKeyState } from "./store/lol";
import { useRecoilValue } from "recoil";
import LolSearch from "./components/lol/search/LolSearch";
import { BrowserRouter, Routes, Route, useHref } from "react-router-dom";
import SearchLol from "./service/SearchLol";
import styled from "styled-components";
import YoutubeOpen from "./components/youtube/YoutubeOpen";
import Loading from "./components/Loading";
import Footer from "./layouts/Footer";
import "./App.css";
import "./tailwind.css";
import LolSearchResult from "./components/lol/search/LolSearchResult";
import { useEffect } from "react";
function App() {
	const userInfo = useContext(AuthContext);
	const loginValue = useRecoilValue(loginState);
	const [favoriteOpen, favoriteSetOpen] = useState(false);
	const currentSearchKey = useRecoilValue(searchKeyState);
	SearchLol();

	return (
		<BrowserRouter>
			<Wrap
				className="wrap"
				// 특정영역 외 클릭 시 즐겨찾기 숨기기
				onClick={(e) => {
					e.stopPropagation();
					const target = e.target as HTMLElement;
					const element = target.className;

					if (
						element ==
							e.currentTarget?.querySelector(".LolSearchInput")?.className ||
						element ==
							e.currentTarget?.querySelector(".FavoriteSection")?.className
					) {
						favoriteSetOpen(true);
					} else {
						favoriteSetOpen(false);
					}
				}}
			>
				<Header />

				<LolSearch open={favoriteOpen} />
				{/* <React.Suspense fallback={<Loading />}>
					<SearchLol />
				</React.Suspense> */}
				<React.Suspense fallback={<Loading />}>
					{currentSearchKey == "null" ? null : <LolSearchResult />}
				</React.Suspense>
				<Routes>
					<Route
						path="/"
						element={loginValue == true && !userInfo ? <SignUp /> : null}
					/>
				</Routes>
				<Footer />
			</Wrap>
		</BrowserRouter>
	);
}

const Wrap = styled.div`
	position: fixed;
	left: 50%;
	top: 50%;
	transform: translate(-50%, -50%);
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	width: 100%;
	height: 100%;
	padding: 2rem;
`;

export default App;
