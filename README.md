Crypto Dashboard

A responsive cryptocurrency dashboard built with React. It shows live market data from the CoinGecko API, lets you search the listed coins, and displays a price-history chart for any selected coin.

Live demo (Netlify): https://chimerical-choux-5d931d.netlify.app/ 

Repository: https://github.com/Vardhaparab/CryptoCurrency_Dashboard

Features
Coin listing with name, symbol, logo, current price (USD), 24h change and market cap
24h change shown in green (positive) or red (negative)
Click a coin to see its price history as a line chart
Time range selection: 24 Hours and 7 Days
Tooltip on hover showing date/time and price
Search by name or symbol, with a clear button
Loading indicators and graceful error handling (including a message for API rate limits and a Retry button)
Responsive layout for mobile, tablet and desktop
Bonus: dark/light mode toggle (saved in localStorage)
Bonus: auto-refresh every 30 seconds with a countdown timer
Bonus: reset button to deselect the chosen coin
Tech Stack
React (functional components and hooks)
Vite
Tailwind CSS
Axios
Recharts


Project Structure:

src/
├── components/    # CryptoCard, CryptoList, CryptoChart, Searchbar, ThemeToggle, Loading, ErrorMessage
├── hooks/         # useCryptos (fetching, auto-refresh, countdown)
├── services/      # cryptoApi.js (API calls)
├── utils/         # format.js (currency formatting)
├── App.jsx
├── main.jsx
└── index.css
Installation

Prerequisites: Node.js 18 or higher and npm.

bash
git clone https://github.com/Vardhaparab/CryptoCurrency_Dashboard
cd CryptoCurrency_Dashboard
npm install
Running the Project
bash
npm run dev       # start the development server
npm run build     # create a production build
npm run preview   # preview the production build locally
API and Proxy

Data comes from the CoinGecko API. Requests go to /api/v3/... and are forwarded to https://api.coingecko.com:

In development, by the proxy configured in vite.config.js
In production (Netlify), by the rewrite rule in public/_redirects
Known Issues and Limitations
Rate limits: the free CoinGecko API allows only a limited number of requests per minute. Switching chart ranges quickly or leaving the page open for a long time may show a "rate limit" message. Use the Retry button after a short wait.
Search scope: search filters only the coins currently displayed. Coins outside the loaded list will not be found.
Not implemented: two-coin comparison (optional bonus feature).
Testing: automated tests are not included yet.
