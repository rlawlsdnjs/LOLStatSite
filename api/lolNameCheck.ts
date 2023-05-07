

import type { VercelRequest, VercelResponse } from '@vercel/node';
import fetch from 'node-fetch';

const URL_KR_RIOT = 'https://kr.api.riotgames.com';

const KEY = `api_key=${process.env.VITE_RIOT_API_KEY}`;
export default async function getUserName(request: VercelRequest, response: VercelResponse) {
    const { body } = request;
    const summonerName = body.data;
  
    try {
      const res = await fetch(`${URL_KR_RIOT}/lol/summoner/v4/summoners/by-name/${summonerName}?${KEY}`);
      if (res.status === 404) {
        response.status(404).json({ check: false });
      } else {
        const data = await res.json();
        response.json({ check: true });
      }
    } catch (err) {
      response.status(500).json({ check: false });
      return response.json({ check: false });
    }
  }