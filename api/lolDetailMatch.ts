

import type { VercelRequest, VercelResponse } from '@vercel/node';
import fetch from 'node-fetch';

const URL_ASIA_RIOT = 'https://asia.api.riotgames.com';

// process.env는 vercel 내부의 serverless environment에서 설정해서 api key를 세팅
const KEY = `api_key=${process.env.VITE_RIOT_API_KEY}`;
export default async function getDetailMatch(request: VercelRequest, response: VercelResponse) {
  try {

    const { body } = request;
    const payload = body.data;
    const { data } = payload;
    const res = await fetch(`${URL_ASIA_RIOT}/lol/match/v5/matches/${payload}?${KEY}`);

    const result = await res.json().then((data) => data);

    response.status(200).json({
      result,
    });
  } catch (err) {
    console.log(err);
  }
}