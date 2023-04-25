import fetch from "node-fetch";

const KEY = `api_key=${process.env.VITE_RIOT_API_KEY}`;
const URL_ASIA_RIOT = 'https://asia.api.riotgames.com';

export default async function getDetailMatch(match:string) {
  try {

    const res = await fetch(`${URL_ASIA_RIOT}/lol/match/v5/matches/${match}?api_key=${KEY}`);

    const result = await res.json().then((data) => data);

    return result
  } catch (err) {
    console.log(err);
  }
}