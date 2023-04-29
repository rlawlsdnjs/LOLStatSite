

import type { VercelRequest, VercelResponse } from '@vercel/node';
import fetch from 'node-fetch';

const URL_ASIA_RIOT = 'https://asia.api.riotgames.com';

const KEY = `api_key=${process.env.VITE_RIOT_API_KEY}`;
export default async function getUserMatch(request: VercelRequest, response: VercelResponse) {
  try {

    const { body } = request;
    const matchId = body.data;
    const { data } = matchId;
    const res = await fetch(`${URL_ASIA_RIOT}/lol/match/v5/matches/by-puuid/${matchId}/ids?start=0&count=15&${KEY}`);
    const result = await res.json().then((data) => data);


    const matchDetail = result.map((gameId: string) =>
    fetch(`${URL_ASIA_RIOT}/lol/match/v5/matches/${gameId}?${KEY}`)
     .then((res) => res.json()));

     const matchData = await Promise.all(matchDetail).then((data) => data);;
    response.status(200).json({
      matchData,
    });
  } catch (err) {
    console.log(err);
  }
}