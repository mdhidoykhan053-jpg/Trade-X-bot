const url = "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd";
const INTERVAL_MS = 15000; // প্রতি ১৫ সেকেন্ড পরপর

let isFetching = false;

async function fetchBitcoinUsdPrice() {
  if (isFetching) return;
  isFetching = true;
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP Error: ${res.status}`);

    const data = await res.json();
    const usdPrice = data?.bitcoin?.usd;
    if (typeof usdPrice !== "number") throw new Error("Invalid response");

    console.log(`[${new Date().toLocaleTimeString()}] BTC USD Price: $${usdPrice}`);
  } catch (err) {
    console.error(`[${new Date().toLocaleTimeString()}] Fetch failed: ${err.message}`);
  } finally {
    isFetching = false;
  }
}

fetchBitcoinUsdPrice();
setInterval(fetchBitcoinUsdPrice, INTERVAL_MS);
