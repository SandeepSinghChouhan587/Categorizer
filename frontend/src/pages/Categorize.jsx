import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import API from "../services/api";
import { AppContext } from "../context/AppContext";

const Categorize = () => {

  const navigate = useNavigate();
  const { user} = useContext(AppContext);

  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // LOGIN CHECK
    if (!user) {
      toast.error("Please login first");
      return navigate("/Login");
    }
    
    if (!url) {
      return toast.error("Please paste a valid URL");
    }

    if(!url.includes("youtube.com") && !url.includes("youtu.be") && !url.includes("instagram.com")){
   return toast.error("Invalid URL");
}

    try {
      setLoading(true);

      setStep("Fetching content...");
      await new Promise((r) => setTimeout(r, 800));

      setStep("Analyzing hashtags & captions...");
      await new Promise((r) => setTimeout(r, 800));

      setStep("AI categorizing the content...");

      const res = await API.post("/posts/create", { url });
    
      if (res.data.success) {

        toast.success("Content categorized successfully");

        setTimeout(() => {
          navigate("/Saved");
        }, 1200);
      }

    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Failed to categorize content"
      );
    } finally {
      setLoading(false);
      setStep("");
      setUrl("");
    }
  };

  return (
    <div id="categorize" className="min-h-screen text-white flex items-center justify-center px-4">

      <div className="w-full max-w-2xl bg-transparent backdrop-blur-3xl border border-zinc-800 rounded-xl p-8 shadow-lg">

        <h1 className="text-3xl font-semibold mb-2">
          AI Content Categorizer
        </h1>

        <p className="text-zinc-400 mb-8">
          Paste a YouTube or Instagram post URL. Our AI will analyze captions,
          hashtags and metadata to categorize the content for easy searching.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">

          <div>
            <label className="block text-sm text-zinc-400 mb-2">
              Paste URL
            </label>

            <input
              type="url"
              placeholder="https://instagram.com/... or https://youtube.com/..."
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <button
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-500 transition rounded-lg py-3 font-medium disabled:opacity-60"
          >
            {user? loading ? "Processing..." : "Categorize Content":"Please Login First"}
          </button>

        </form>

        {loading && (
          <div className="mt-6">

            <div className="w-full bg-zinc-800 rounded-full h-2 mb-3">
              <div className="bg-indigo-500 h-2 rounded-full animate-pulse w-full"></div>
            </div>

            <p className="text-sm text-zinc-400">{step}</p>

          </div>
        )}

        <div className="mt-10 border-t border-zinc-800 pt-6 text-sm text-zinc-500">

          <p className="mb-2">
            ✔ Supported platforms
          </p>

          <ul className="list-disc list-inside space-y-1">
            <li>YouTube Videos</li>
            <li>Instagram Posts / Reels</li>
          </ul>

        </div>

      </div>

    </div>
  );
};

export default Categorize;