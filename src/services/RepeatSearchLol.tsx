import { useEffect } from "react";
import { useRecoilValue } from "recoil";
import {
	searchState,
	userDataState,
	searchKeyState,
	userMatchState,
} from "../store";

import SearchLol from "../hooks/SearchLol";
const currentSearchKey = useRecoilValue(searchKeyState);

const RepeatSearchLol = useEffect(() => {
	if (currentSearchKey) {
		SearchLol();
	} else return;

	// setUser((userDataState: any) => [...userDataState, userState]);
}, [currentSearchKey]);

export default RepeatSearchLol;
