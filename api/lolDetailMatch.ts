
import type { VercelRequest, VercelResponse } from '@vercel/node';
import fetch from 'node-fetch';

const URL_ASIA_RIOT = 'https://asia.api.riotgames.com';

// process.env는 vercel 내부의 serverless environment에서 설정해서 api key를 세팅
const KEY = `api_key=${process.env.VITE_RIOT_API_KEY}`;
export default async function getDetailMatch(request: VercelRequest, response: VercelResponse) {
  try {
    const { gameIds } = request.body;
    
    const promises = gameIds.map((gameId: string) =>
       fetch(`${URL_ASIA_RIOT}/lol/match/v5/matches/${gameId}?${KEY}`)
        .then((res) => res.json())
    );

    const matchArr: any = [];

    for (let i = 0, len = gameIds.length; i < len; i++) {
      matchArr.push(
        fetch(`/api/lol/match/v5/matches/${gameIds[i]}`, {
          headers: {
            "X-Riot-Token": KEY,
          },
        })
      );
    }

    const results = await Promise.all(matchArr);

    response.status(200).json({ results });
  } catch (err) {
    console.error(err);
    response.status(500).json({ message: "Internal server error" });
  }
}