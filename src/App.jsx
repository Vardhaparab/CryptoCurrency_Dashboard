import { useMemo, useState } from "react";
import useCryptos from "./hooks/useCryptos";
import CryptoList from "./components/CryptoList";
import CryptoChart from "./components/CryptoChart";
import Searchbar from "./components/Searchbar";
import ThemeToggle from "./components/ThemeToggle";
import Loading from "./components/Loading";
import Errormessage from "./components/Errormessage";

const App = () => {
  const { coins, loading, error, countdown, refetch } = useCryptos();
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return coins;
    return coins.filter(
      (c) => c.name.toLowerCase().includes(q) || c.symbol.toLowerCase().includes(q)
    );
  }, [coins, search]);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 dark:bg-gray-900">
      <div className="mx-auto max-w-7xl p-4 sm:p-6">
        <header className="mb-6 flex flex-wrap items-center justify-between gap-3 bg-violet-500/10 p-5 rounded">
          <h1 className="text-2xl font-bold dark:text-white">Crypto Dashboard</h1>
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Refresh in {countdown}s
            </span>
            <ThemeToggle />
          </div>
        </header>

        {selected && (
          <CryptoChart coin={selected} onReset={() => setSelected(null)} />
        )}

        <div className="mb-4">
          <Searchbar value={search} onChange={setSearch} />
        </div>

        {loading ? (
          <Loading />
        ) : error && coins.length === 0 ? (
          <Errormessage message={error} onRetry={refetch} />
        ) : (
          <>
            {error && <div className="mb-4"><Errormessage message={error} /></div>}
            <CryptoList
              coins={filtered}
              selectedId={selected?.id}
              onSelect={setSelected}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default App;