import styled, { keyframes } from "styled-components";
import React, { useEffect, useState } from "react";
import { searchKeyState } from "../../../store/lol";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import tw from "tailwind-styled-components";
import { db } from "../../../api/firebase";
import { auth } from "../../../api/firebase";
import { onSnapshot } from "firebase/firestore";
import { useContext } from "react";
import { AuthContext } from "../../sign/context/authContext";
import { favoriteState } from "../../../store/lol";
import { doc } from "firebase/firestore";
import RemoveFavorite from "./RemoveFavorite";
import SearchLol from "../../../service/SearchLol";

interface IOpen {
	open: boolean;
}
const LolSearch = (props: IOpen) => {
	const [userSearch, setUserSearch] = useState("");

	const [lolSearch, setLolSearch] = useRecoilState(searchKeyState);
	const changehId = (e: React.ChangeEvent<HTMLInputElement>) => {
		e.preventDefault();
		setUserSearch(e.target.value);
	};

	const keywordChange = () => {
		setLolSearch(userSearch);
	};

	let [favorite, setFavorite] = useRecoilState(favoriteState);
	const user = auth.currentUser;
	const userInfo = useContext(AuthContext);

	useEffect(() => {
		return onSnapshot(doc(db, "LolUser", `${user?.email}`), (doc) => {
			let favoriteArr = Array(doc?.data()?.favorite).map((item) => {
				return item;
			});
			setFavorite(favoriteArr[0]);
		});
	}, [userInfo]);

	const keywordChangeFavorite = (e: any) => {
		e.preventDefault();
		setLolSearch(e.target.textContent);
	};

	const handleOnKeyPress = (e: React.KeyboardEvent) => {
		if (e.key === "Enter") {
			setLolSearch(userSearch);
		}
	};

	return (
		<>
			<SearchForm>
				<FavoriteSection>
					<input
						className="LolSearchInput"
						type="search"
						placeholder="소환사명을 입력 해주세요(띄어쓰기 포함)"
						onChange={changehId}
						onKeyDown={handleOnKeyPress}
					/>
					{favorite != null && props.open && userInfo != null ? (
						<FavoriteList className="FavoriteSection">
							<h3>Favorites</h3>
							{Object.values(favorite).map((userName) => {
								return (
									<FavoriteLi onClick={keywordChangeFavorite} key={userName}>
										<FavoriteUserName>{userName}</FavoriteUserName>
										<RemoveFavorite userName={userName} />
									</FavoriteLi>
								);
							})}
						</FavoriteList>
					) : null}
				</FavoriteSection>
				<button onClick={keywordChange}>검색</button>
			</SearchForm>
		</>
	);
};

const twSearchForm = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	margin: 30px 0;
	& input {
		width: 30vw;
		height: 50px;
		border: 2px solid #000;
		border-radius: 10px 0px 0px 0px;

		background: rgba(255, 255, 255, 0.9);
		text-indent: 15px;
		border-right: none;
	}
	& input:focus {
		outline: none;
	}

	& button {
		background: rgb(0, 0, 0);
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
const SearchForm = tw(twSearchForm)<any>`
  flex;
  items-center;
  justify-center;
  my-4
`;
const Lolresult = styled.div``;

const FavoriteList = styled.ul`
	position: absolute;
	background: rgba(255, 255, 255, 0.9);
	z-index: 30;
	width: 100%;
	padding: 10px;
	border: 2px solid #000;
	left: 0;
	top: 97%;
	max-height: 200px;
	overflow-y: scroll;
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
const FavoriteLi = styled.li`
	height: 30px;
	align-items: center;
	display: flex;
	margin: 7px 0;
`;

const FavoriteSection = styled.div`
	position: relative;
`;

const FavoriteUserName = styled.span`
	display: block;
	width: 100%;
	border: 1px solid #000;
	height: 100%;
	line-height: 30px;
	text-indent: 10px;
	-webkit-text-stroke: 1px rgb(0, 0, 0);
	color: transparent;
	font-size: 15px;
	cursor: pointer;
	background: #fff;
`;

export default LolSearch;
