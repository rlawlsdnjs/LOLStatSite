import { db, auth } from "../../../api/firebase";
import { updateDoc, doc, arrayUnion, arrayRemove } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { favoriteState, searchKeyState } from "../../../store/lol";
import styled from "styled-components";
const FavoriteBtn = (props: any) => {
	const frankDocRef = doc(db, "LolUser", `${auth.currentUser?.email}`);
	const [favorite, setFavorite] = useState(false);
	const favoriteArr: string[] = useRecoilValue(favoriteState);
	const currentSearchKey = useRecoilValue<any>(searchKeyState);
	const user = auth.currentUser;
	useEffect(() => {
		if (user == null) {
			return;
		} else {
			const includeFavorite = favoriteArr.includes(currentSearchKey);
			includeFavorite ? setFavorite(true) : setFavorite(false);
		}
	}, []);

	const favoriteActive = async () => {
		if (user == null) {
			alert("로그인 후 이용해주세요.");
		} else {
			// 즐겨찾기 추가/ 삭제
			favorite ? setFavorite(false) : setFavorite(true);
			return favorite
				? await updateDoc(frankDocRef, {
						favorite: arrayRemove(props.nick),
				  })
				: await updateDoc(frankDocRef, {
						favorite: arrayUnion(props.nick),
				  });
		}
	};
	return (
		<FavoriteButton onClick={favoriteActive}>
			{favorite ? "Unfavorite" : "Favorite"}
		</FavoriteButton>
	);
};

const FavoriteButton = styled.button`
	margin-top: 15px;
	border-radius: 5px;
`;

export default FavoriteBtn;
