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
		const youtubeParams = axios.create({
			baseURL: "https://youtube.googleapis.com/youtube/v3",
			params: { key: YoutubeAPI },
		});

		const searchYoutube = await youtubeParams.get("search", {
			params: {
				part: "snippet",
				q: YoutubeSearchKey,
				type: "video",
				maxResults: 10,
			},
		});

		return YoutubeSearchKey == "" ? null : searchYoutube.data.items;
	},
});
