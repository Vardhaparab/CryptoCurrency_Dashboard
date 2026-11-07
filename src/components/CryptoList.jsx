import CryptoCard from "./CryptoCard";

const CryptoList = ({ coins, selectedId, onSelect }) => {
  if (coins.length === 0) {
    return (
      <p className="py-10 text-center text-gray-500 dark:text-gray-400">
        No cryptocurrencies match your search.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ">
      {coins.map((coin) => (
        <CryptoCard
          key={coin.id}
          coin={coin}
          selected={coin.id === selectedId}
          onSelect={onSelect}
        />
      ))}
    </div>
  );
};
export default CryptoList;