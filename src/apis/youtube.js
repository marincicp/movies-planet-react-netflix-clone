import axios from "axios";

const KEY = process.env.KEY;

const YT_KEY = "https://youtube-v31.p.rapidapi.com";

const options = {
  params: {
    maxResults: 1,
    part: "snippet,id",
  },
  headers: {
    "X-RapidAPI-Key": "067679d704msh4b7a727b3b08c89p113ef6jsn989db0a3161b",
    "X-RapidAPI-Host": "youtube-v31.p.rapidapi.com",
  },
};

export const fetchFromAPI = async (url) => {
  const { data } = await axios.get(`${YT_KEY}/${url}`, options);

  return data;
};
