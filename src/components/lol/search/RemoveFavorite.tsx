import { updateDoc, doc, arrayUnion, arrayRemove } from "firebase/firestore";
import { db } from "../../../api/firebase";
import styled from "styled-components";
import { auth } from "../../../api/firebase";
interface IUserName {
	userName: string;
}
const RemoveFavorite = (props: IUserName) => {
	const frankDocRef = doc(db, "LolUser", `${auth.currentUser?.email}`);
	const remove = async () => {
		// 즐겨찾기 삭제
		await updateDoc(frankDocRef, {
			favorite: arrayRemove(props.userName),
		});
	};
	return <RemoveBtn onClick={remove}>x</RemoveBtn>;
};

const RemoveBtn = styled.button`
	padding: 0;
	padding: 5px 10px;
	height: 30px;
	border: none;
	line-height: 1;
	& :focus {
		outline: none;
	}
`;

export default RemoveFavorite;
