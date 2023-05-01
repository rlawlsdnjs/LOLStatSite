

import type { VercelRequest, VercelResponse } from '@vercel/node';
import fetch from 'node-fetch';

const BASE_URL = 'https://youtube.googleapis.com/youtube/v3';
const KEY = `${process.env.VITE_YOUTUBE_API_KEY}`;
export default async function getYoutubeSearch(request: VercelRequest, response: VercelResponse) {
  try {

    const { body } = request;
    const youtubeKeyword = body.data;
    const params = ({
        key: KEY,
        part: 'snippet',
        q: youtubeKeyword,
        type: 'video',
        maxResults: 10,
      });
  
      const res = await fetch(`${BASE_URL}/search?${params.toString()}`);

  
      const result = await res.json();
      response.status(200).json({
        result,
      });
  } catch (err) {
    console.log(err);
  }
}