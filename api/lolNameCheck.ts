

import type { VercelRequest, VercelResponse } from '@vercel/node';
import fetch from 'node-fetch';

const URL_KR_RIOT = 'https://kr.api.riotgames.com';

const KEY = `api_key=${process.env.VITE_RIOT_API_KEY}`;
export default async function getUserName(request: VercelRequest, response: VercelResponse) {
  try {

    const { body } = request;
    const summonerName = body.data;
    const res = await fetch(`${URL_KR_RIOT}/lol/summoner/v4/summoners/by-name/${summonerName}?${KEY}`);
    if ( response.status(200)) {
        if (res.status === 404) {
            return { check: false };
          }
          const data = await res.json();
          
          return { check: true };
    }

  } catch (err) {
    return { check: false };
  }
}