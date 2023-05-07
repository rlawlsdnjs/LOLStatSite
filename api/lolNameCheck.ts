

import type { VercelRequest, VercelResponse } from '@vercel/node';
import fetch from 'node-fetch';

const URL_ASIA_RIOT = 'https://asia.api.riotgames.com';

const KEY = `api_key=${process.env.VITE_RIOT_API_KEY}`;
export default async function getUserMatch(request: VercelRequest, response: VercelResponse) {
  try {

    const { body } = request;
    const summonerName = body.data;
    const res = await fetch(`https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summonerName}?${KEY}`);
    const result = await res.json().then((data) => data);



    return true
  } catch (err) {
    return false
  }
}