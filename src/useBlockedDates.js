import { useEffect, useState } from "react";
import { parseICalToBlockedDates } from "./icalParser";

/**
 * Wraps an iCal URL through corsproxy.io to avoid CORS errors in the browser.
 * Replace this logic if you have your own CORS proxy or backend endpoint.
 */
const proxify = (url) => {
  if (!url) return null;
  return `https://corsproxy.io/?${encodeURIComponent(url)}`;
};

/**
 * Fetches one or more iCal URLs, parses them, and returns a unified Set
 * of blocked ISO date strings.
 *
 * @param {Object} icalUrls - e.g. { airbnb: "...", booking: "..." }
 * @returns {{ blockedDates: Set<string>, loading: boolean, error: string|null }}
 */
const useBlockedDates = (icalUrls) => {
  const [blockedDates, setBlockedDates] = useState(new Set());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const urls = Object.values(icalUrls || {}).filter(Boolean);
    if (urls.length === 0) return;

    let cancelled = false;
    setLoading(true);
    setError(null);

    const fetchAll = async () => {
      try {
        const results = await Promise.allSettled(
          urls.map(async (url) => {
            const proxiedUrl = proxify(url);
            const res = await fetch(proxiedUrl);
            if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
            return res.text();
          })
        );

        if (cancelled) return;

        const unified = new Set();
        for (const result of results) {
          if (result.status === "fulfilled") {
            const dates = parseICalToBlockedDates(result.value);
            dates.forEach((d) => unified.add(d));
          }
        }

        setBlockedDates(unified);
      } catch (err) {
        if (!cancelled) setError(err.message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchAll();
    return () => { cancelled = true; };
  }, [JSON.stringify(icalUrls)]); // eslint-disable-line react-hooks/exhaustive-deps

  return { blockedDates, loading, error };
};

export default useBlockedDates;
