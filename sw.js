/* 旅行账本 Service Worker
 * 策略：
 * - 同源核心文件（index.html / app.jsx / manifest / 图标）：网络优先，失败回缓存 → 更新及时、离线可用
 * - CDN 依赖（React / d3 / lucide / babel / tailwind，均带版本号）：缓存优先 → 首次加载后离线可用
 * - 历史汇率（URL 含具体日期，属不可变快照）：缓存优先
 * - 实时汇率（@latest）：直连网络、绝不缓存 → 避免使用过期实时汇率
 * - 其它（地理编码等）：直连网络，不缓存
 * 注意：SW 缓存只存放静态资源与不可变历史汇率，不作为业务数据存储；账目数据在 IndexedDB/localStorage。
 */
const VERSION = "v1.5.0";
const CORE_CACHE = `core-${VERSION}`;
const CDN_CACHE = "cdn-v1";
const RATE_CACHE = "rates-v1";
const CORE = ["./", "./index.html", "./app.jsx", "./manifest.webmanifest", "./icons/icon-192.png", "./icons/icon-512.png", "./icons/icon-512-maskable.png", "./icons/apple-touch-icon.png"];
const CDN_HOSTS = ["unpkg.com", "cdn.jsdelivr.net", "cdn.tailwindcss.com"];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CORE_CACHE).then((c) => c.addAll(CORE)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.filter((k) => k.startsWith("core-") && k !== CORE_CACHE).map((k) => caches.delete(k)))).then(() => self.clients.claim())
  );
});

const isRateUrl = (url) => url.hostname.endsWith("currency-api.pages.dev") || url.pathname.includes("@fawazahmed0/currency-api");
const isHistoricalRate = (url) => /\d{4}-\d{2}-\d{2}/.test(url.href);   // 含具体日期 = 不可变历史数据

async function networkFirst(req, cacheName) {
  const cache = await caches.open(cacheName);
  try {
    const res = await fetch(req);
    if (res && res.ok) cache.put(req, res.clone());
    return res;
  } catch {
    const hit = await cache.match(req, { ignoreSearch: false });
    if (hit) return hit;
    throw new Error("offline");
  }
}
async function cacheFirst(req, cacheName) {
  const cache = await caches.open(cacheName);
  const hit = await cache.match(req);
  if (hit) return hit;
  const res = await fetch(req);
  if (res && res.ok) cache.put(req, res.clone());
  return res;
}

self.addEventListener("fetch", (e) => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);

  // 汇率接口：历史日期=不可变快照→缓存优先；@latest 实时汇率→直连网络、不缓存
  if (isRateUrl(url)) {
    if (isHistoricalRate(url)) e.respondWith(cacheFirst(req, RATE_CACHE));
    return; // latest 不拦截：走网络，绝不缓存
  }
  // 同源核心
  if (url.origin === self.location.origin) {
    e.respondWith(networkFirst(req, CORE_CACHE));
    return;
  }
  // CDN 依赖（带版本号，内容不可变）
  if (CDN_HOSTS.some((h) => url.hostname === h || url.hostname.endsWith("." + h))) {
    e.respondWith(cacheFirst(req, CDN_CACHE));
    return;
  }
  // 其余（nominatim 等）直连，不缓存
});
