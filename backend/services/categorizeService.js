const axios = require("axios");

exports.categorizeContent = async (text) => {

const categories = [
  "technology",
  "education",
  "entertainment",
  "sports",
  "finance",
  "health",
  "food",
  "travel",
  "news",
  "lifestyle",
  "fashion",
  "fitness",
  "motivation",
  "business",
  "science",
  "photography",
  "art",
  "diy",
  "animals",
  "spirituality",
  "automobile",
  "history",
  "politics",
  "parenting",
  "relationships",
  "productivity"
];

  try {

    const res = await axios.post(
      "https://router.huggingface.co/hf-inference/models/facebook/bart-large-mnli",
      {
        inputs: text,
        parameters: {
          candidate_labels: categories
        }
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.HF_API_KEY}`
        }
      }
    );

    if (!res.data || res.data.length === 0) {
      return "general";
    }

    // top prediction
    return res.data[0].label;

  } catch (err) {

    console.log("Categorization error:",
      err.response?.data || err.message
    );

    return "general";
  }
};