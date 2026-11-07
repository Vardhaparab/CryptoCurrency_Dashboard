import { useEffect, useState } from "react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";
import { getCryptoHistory } from "../services/cryptoApi";
import { formatUSD } from "../utils/format";
import Loading from "./Loading";
import Errormessage from "./Errormessage";

const RANGES = [
  { label: "24 Hours", days: 1 },
  { label: "7 Days", days: 7 },
];

const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null;
  const { timestamp, price } = payload[0].payload;
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-2 text-sm shadow dark:border-gray-700 dark:bg-gray-800 dark:text-white">
      <p className="text-gray-500 dark:text-gray-400">
        {new Date(timestamp).toLocaleString()}
      </p>
      <p className="font-semibold">{formatUSD(price)}</p>
    </div>
  );
};

const CryptoChart = ({ coin, onReset }) => {
  const [days, setDays] = useState(7);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [retryKey, setRetryKey] = useState(0);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await getCryptoHistory(coin.id, days);
        if (cancelled) return;
        setData(res.prices.map(([timestamp, price]) => ({ timestamp, price })));
      } catch (err) {
        if (!cancelled) {
          setError(
            err.response?.status === 429
              ? "Rate limit reached. Try again in a minute."
              : "Failed to load price history."
          );
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    load();
    return () => { cancelled = true; };
  }, [coin.id, days, retryKey]);

  const tickFormatter = (ts) =>
    days === 1
      ? new Date(ts).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      : new Date(ts).toLocaleDateString([], { month: "short", day: "numeric" });

  return (
    <section className="mb-8 rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex gap-2 ">
            <img src={coin.image} alt={coin.name} className="h-9 w-9" />
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          {coin.name} ({coin.symbol.toUpperCase()}) Price
        </h2>
        </div>

        <div className="flex gap-2">
          {RANGES.map((r) => (
            <button
              key={r.days}
              onClick={() => setDays(r.days)}
              className={`rounded-lg px-3 py-1 text-sm ${
                days === r.days
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-200"
              }`}
            >
              {r.label}
            </button>
          ))}
          <button
            onClick={onReset}
            className="rounded-lg border border-gray-300 px-3 py-1 text-sm text-gray-700 dark:border-gray-600 dark:text-gray-200"
          >
            Reset
          </button>
        </div>
      </div>

      {loading ? (
        <Loading label="Loading chart..." />
      ) : error ? (
        <Errormessage message={error} onRetry={() => setRetryKey((k) => k + 1)} />
      ) : (
        <div className="h-72 w-full">
          <ResponsiveContainer>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#9ca3af33" />
              <XAxis dataKey="timestamp" tickFormatter={tickFormatter} minTickGap={40} stroke="#9ca3af" fontSize={12} />
              <YAxis domain={["auto", "auto"]} tickFormatter={(v) => `$${v.toLocaleString()}`} width={80} stroke="#9ca3af" fontSize={12} />
              <Tooltip content={<CustomTooltip />} />
              <Line type="monotone" dataKey="price" stroke="#3b82f6" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </section>
  );
};
export default CryptoChart;