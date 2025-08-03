import axios from "axios";
import React, { useEffect, useState } from "react";
import CopyToClipboard from "react-copy-to-clipboard";

const LinkResult = ({ input }) => {
  const BITLY_TOKEN = import.meta.env.VITE_BITLY_TOKEN;

  const [shorten, setShorten] = useState("");

  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await axios.post(
        "https://api-ssl.bitly.com/v4/shorten",
        { long_url: input },
        {
          headers: {
            Authorization: `Bearer ${BITLY_TOKEN}`,
            "Content-Type": "application/json",
          },
        }
      );
      setShorten(res.data.link);
    } catch (err) {
      setError("Failed to shorten link");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (input.length) {
      fetchData();
    }
  }, [input]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCopied(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [copied]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shorten);
      setCopied(true);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  return (
    <>
      {loading && <p className="loader">Loading...</p>}
      {error && <p className="error">{error}</p>}
      {shorten && (
        <div className="result">
          <p>{shorten}</p>

          <button onClick={handleCopy} className={copied ? "copied" : ""}>
            {copied ? "Copied!" : "Copy to clipboard"}
          </button>
        </div>
      )}
    </>
  );
};

export default LinkResult;
