import { atom, selector } from "recoil";
import axios from "axios";
const YoutubeAPI = import.meta.env.VITE_YOUTUBE_API_KEY;

export const YoutubeSearchKeyState = atom<string>({
	key: "YoutubeSearchKeyState",
	default: "",
});

export const YoutubeResult: any = selector({
	key: "YoutubeResult",
	get: async ({ get }) => {
		const YoutubeSearchKey = get<any>(YoutubeSearchKeyState);
		const youtubeKeyword = {
			data: `${YoutubeSearchKeyState}`,
		};
		const youtubeOptions: RequestInit = {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(youtubeKeyword),
		};

		// serverless functions 요청
		if (YoutubeSearchKey == "") {
			return;
		} else {
			const youtubeList = await fetch("/api/youtubeList", youtubeOptions);
			const youtubeListResult = await youtubeList.json();
			console.log("youtube", youtubeListResult);

			return youtubeListResult;
		}
	},
});
