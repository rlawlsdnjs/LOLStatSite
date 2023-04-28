

import type { VercelRequest, VercelResponse } from '@vercel/node';
import fetch from 'node-fetch';

const URL_ASIA_RIOT = 'https://asia.api.riotgames.com';

// process.env는 vercel 내부의 serverless environment에서 설정해서 api key를 세팅
const KEY = `api_key=${process.env.VITE_RIOT_API_KEY}`;
export default async function getDetailMatch(request: VercelRequest, response: VercelResponse) {
  try {

    const { body } = request;
    const payload = body.data;


    const matchValue = Object.values(payload);

    const matchArr: any = [];
    for (let i = 0, len = 20; i < len; i++) {
      matchArr.push(
        await fetch(`${URL_ASIA_RIOT}/lol/match/v5/matches/${matchValue[i]}?${KEY}`)
      );
    }

    const allMatch: any = await Promise.all(matchArr)
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.log(error);
    });

    const result = await allMatch.json().then((data) => data);

    response.status(200).json({
      allMatch,
    });
  } catch (err) {
    console.log(err);
  }
}