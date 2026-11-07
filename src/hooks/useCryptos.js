import { useState, useEffect, useCallback } from "react";
import { getCryptos } from "../services/cryptoApi";

const REFRESH_SECONDS = 30;

export default function useCryptos() {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [countdown, setCountdown] = useState(REFRESH_SECONDS);

  const fetchCoins = useCallback(async () => {
    try {
      const data = await getCryptos();
      setCoins(data);
      setError(null);
    } catch (err) {
      setError(
        err.response?.status === 429
          ? "Rate limit reached. Please wait a moment and try again."
          : "Failed to load cryptocurrency data."
      );
    } finally {
      setLoading(false);
      setCountdown(REFRESH_SECONDS);
    }
  }, []);

  // initial load
  useEffect(() => {
    fetchCoins();
  }, [fetchCoins]);

  // tick every second
  useEffect(() => {
    const id = setInterval(() => setCountdown((c) => Math.max(c - 1, 0)), 1000);
    return () => clearInterval(id);
  }, []);

  // refresh when countdown hits 0
  useEffect(() => {
    if (countdown === 0) fetchCoins();
  }, [countdown, fetchCoins]);

  return { coins, loading, error, countdown, refetch: fetchCoins };
}