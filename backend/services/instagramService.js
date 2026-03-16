const axios = require("axios");
const he = require("he");

exports.getInstagramData = async (url) => {
  try {

    url = url.split("?")[0];

    const res = await axios.get(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
      },
    });

    const html = res.data;

    const imageMatch = html.match(/og:image" content="([^"]+)"/);
    const titleMatch = html.match(/og:title" content="([^"]+)"/);
    const descMatch = html.match(/og:description" content="([^"]+)"/);

    let thumbnail = imageMatch ? imageMatch[1] : "";
    let title = titleMatch ? titleMatch[1] : "";
    let description = descMatch ? descMatch[1] : "";

    // decode HTML entities
    title = he.decode(title);
    description = he.decode(description);
    thumbnail = he.decode(thumbnail);
    
    const hashtags = description.match(/#\w+/g) || [];

    return {
      title,
      description,
      hashtags,
      thumbnail,
    };

  } catch (error) {
    console.log("Instagram fetch error:", error.message);
    throw new Error("Instagram data fetch failed");
  }
};