import axios from "axios";

const YT_KEY = "https://youtube-v31.p.rapidapi.com";

const options = {
  params: {
    maxResults: 1,
    part: "snippet,id",
  },
  headers: {
    "X-RapidAPI-Key": process.env.REACT_APP_RAPIDAPI_KEY,
    "X-RapidAPI-Host": "youtube-v31.p.rapidapi.com",
  },
};

export const fetchFromAPI = async (url) => {
  const { data } = await axios.get(`${YT_KEY}/${url}`, options);

  return data;
};
