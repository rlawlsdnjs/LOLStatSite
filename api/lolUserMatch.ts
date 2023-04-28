

import type { VercelRequest, VercelResponse } from '@vercel/node';
import fetch from 'node-fetch';

const URL_ASIA_RIOT = 'https://asia.api.riotgames.com';

const KEY = `api_key=${process.env.VITE_RIOT_API_KEY}`;
export default async function getUserMatch(request: VercelRequest, response: VercelResponse) {
  try {

    const { body } = request;
    const payload = body.data;
    const { data } = payload;
    const res = await fetch(`${URL_ASIA_RIOT}/lol/match/v5/matches/by-puuid/${payload}/ids?start=0&count=20&${KEY}`);
    const result = await res.json().then((data) => data);

    response.status(200).json({
      result,
    });
  } catch (err) {
    console.log(err);
  }
}