import { formatUSD, formatCompact } from "../utils/format";

const CryptoCard = ({ coin, selected, onSelect }) => {
  const change = coin.price_change_percentage_24h ?? 0;
  const positive = change >= 0;

  return (
    <button
      onClick={() => onSelect(coin)}
      className={`w-full rounded-xl border p-4 text-left transition hover:shadow-md dark:hover:shadow-white
        ${selected
          ? "border-blue-500 ring-2 ring-blue-500"
          : "border-gray-200 dark:border-gray-700"}
        bg-white dark:bg-gray-800`}
    >   
      <div className="flex items-center gap-3">
        <img src={coin.image} alt={coin.name} className="h-9 w-9" />
        <div>
          <p className="font-semibold text-gray-900 dark:text-white">{coin.name}</p>
          <p className="text-xs uppercase text-gray-500 dark:text-gray-400">{coin.symbol}</p>
        </div>
      </div>

      <p className="mt-4 text-xl font-bold text-gray-900 dark:text-white">
        {formatUSD(coin.current_price)}
      </p>

      <div className="mt-2 flex items-center justify-between text-sm">
        <span className={positive ? "text-green-500" : "text-red-500"}>
          {positive ? "▲" : "▼"} {Math.abs(change).toFixed(2)}%
        </span>
        <span className="text-gray-500 dark:text-gray-400">
          MCap {formatCompact(coin.market_cap)}
        </span>
      </div>
    </button>
  );
};
export default CryptoCard;