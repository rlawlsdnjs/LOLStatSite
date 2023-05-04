import type { VercelRequest, VercelResponse } from '@vercel/node';
import fetch from 'node-fetch';

const KEY = `api_key=${process.env.VITE_RIOT_API_KEY}`;
export default async function getUserMatch(request: VercelRequest, response: VercelResponse) {
  try {

    const { body } = request;
    const summoner = body.data;
    const userUrl = `https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summoner}?${KEY}`;
    const response = await fetch(userUrl);
    const data = await response.json();
    return true;
 
  } catch (err) {
    return false
  }
}