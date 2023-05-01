

import type { VercelRequest, VercelResponse } from '@vercel/node';
import fetch from 'node-fetch';
import axios from 'axios';
import { URLSearchParamsInit } from 'react-router-dom';

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
  
      const response = await fetch(`${BASE_URL}/search?${params.toString()}`);

  
      const result = await response.json();
      return result;
  } catch (err) {
    console.log(err);
  }
}