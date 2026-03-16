const axios = require("axios");
 
function extractVideoId(url) {
  const patterns = [
    /youtube\.com\/watch\?v=([^&]+)/,
    /youtube\.com\/shorts\/([^?]+)/,
    /youtu\.be\/([^?]+)/,
    /youtube\.com\/embed\/([^?]+)/
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return match[1];
  }

  return null;
}

exports.getYoutubeData = async (url) => {

  url = url.split("?")[0];
  const videoId = extractVideoId(url);

  if (!videoId) {
    throw new Error("Invalid YouTube URL");
  }

  const res = await axios.get(
    "https://www.googleapis.com/youtube/v3/videos",
    {
      params: {
        id: videoId,
        part: "snippet",
        key: process.env.YOUTUBE_API_KEY
      }
    }
  );
  if (!res.data.items.length) {
    throw new Error("Video not found");
  }

  const video = res.data.items[0].snippet;

  return {
    title: video.title,
    description: video.description,
    hashtags: video.tags || [],
    thumbnail: video.thumbnails.high.url
  };
};