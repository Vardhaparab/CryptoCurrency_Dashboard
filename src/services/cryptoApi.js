import axios from "axios";

const API = axios.create({ baseURL: "/api/v3" });

export const getCryptos = async () => {
  const { data } = await API.get("/coins/markets", {
    params: {
      vs_currency: "usd",
      order: "market_cap_desc",
      per_page: 10,
      page: 1,
      sparkline: false,
      price_change_percentage: "24h",
    },
  });
  return data;
};

export const getCryptoHistory = async (coinId, days) => {
  const { data } = await API.get(`/coins/${coinId}/market_chart`, {
    params: { vs_currency: "usd", days },
  });
  return data;
};