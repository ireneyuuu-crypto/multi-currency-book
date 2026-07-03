/* 旅行账本 · 独立部署版（由 v6.jsx 生成，勿手改；改动请回源文件重新生成） */
const { useState, useEffect, useMemo, useRef } = React;
/* 图标逐个兜底：任何图标在 CDN 版本中缺失时渲染占位而非崩溃 */
const _LFb = (props) => React.createElement("svg", { width: props.size || 24, height: props.size || 24 });
const _L = typeof LucideReact !== "undefined" ? LucideReact : {};
const Wallet = _L.Wallet || _LFb;
const PieChart = _L.PieChart || _LFb;
const Globe = _L.Globe || _LFb;
const Briefcase = _L.Briefcase || _LFb;
const Plus = _L.Plus || _LFb;
const ChevronRight = _L.ChevronRight || _LFb;
const ChevronDown = _L.ChevronDown || _LFb;
const X = _L.X || _LFb;
const Search = _L.Search || _LFb;
const SlidersHorizontal = _L.SlidersHorizontal || _LFb;
const RefreshCw = _L.RefreshCw || _LFb;
const Download = _L.Download || _LFb;
const Trash2 = _L.Trash2 || _LFb;
const Pencil = _L.Pencil || _LFb;
const Check = _L.Check || _LFb;
const AlertTriangle = _L.AlertTriangle || _LFb;
const Eye = _L.Eye || _LFb;
const EyeOff = _L.EyeOff || _LFb;
const BarChart3 = _L.BarChart3 || _LFb;
const MoreHorizontal = _L.MoreHorizontal || _LFb;
const MapPin = _L.MapPin || _LFb;
const Calendar = _L.Calendar || _LFb;
const Crosshair = _L.Crosshair || _LFb;
const ImagePlus = _L.ImagePlus || _LFb;
const Bookmark = _L.Bookmark || _LFb;
const Plane = _L.Plane || _LFb;
const Lightbulb = _L.Lightbulb || _LFb;
const LayoutGrid = _L.LayoutGrid || _LFb;
const Utensils = _L.Utensils || _LFb;
const BedDouble = _L.BedDouble || _LFb;
const Bus = _L.Bus || _LFb;
const ShoppingBag = _L.ShoppingBag || _LFb;
const Smile = _L.Smile || _LFb;
const Camera = _L.Camera || _LFb;
const Wifi = _L.Wifi || _LFb;
const HeartPulse = _L.HeartPulse || _LFb;
const Music = _L.Music || _LFb;
const Tag = _L.Tag || _LFb;
const Flag = _L.Flag || _LFb;
{ const _miss = ["Wallet","PieChart","Globe","Briefcase","Plus","ChevronRight","ChevronDown","X","Search","SlidersHorizontal","RefreshCw","Download","Trash2","Pencil","Check","AlertTriangle","Eye","EyeOff","BarChart3","MoreHorizontal","MapPin","Calendar","Crosshair","ImagePlus","Bookmark","Plane","Lightbulb","LayoutGrid","Utensils","BedDouble","Bus","ShoppingBag","Smile","Camera","Wifi","HeartPulse","Music","Tag","Flag"].filter(n => !_L[n]); if (_miss.length) console.warn("图标缺失(显示占位):", _miss.join(",")); }
/* ═══════════ 设计令牌 ═══════════ */
const C = {
  bg: "#FAF6F1", card: "#FFFFFF", fill: "#F4F0EA",
  ink: "#111113", ink2: "#3A3A3C", sec: "#8E8E93", ter: "#C7C7CC",
  sep: "rgba(60,60,67,.09)", hair: "rgba(60,60,67,.12)",
  accent: "#FF4F62", accentDeep: "#E23A4D", accentSoft: "#FFE9EC",
  glass: "rgba(255,255,255,.72)",
  mapWater: "#CFE3F2", mapLand: "#EDEAE3", mapLandStroke: "#E0DCD3",
};
const FONT = '-apple-system,BlinkMacSystemFont,"SF Pro Display","SF Pro Text","PingFang SC",system-ui,"Helvetica Neue",sans-serif';
const NUM = { fontVariantNumeric: "tabular-nums", fontFeatureSettings: '"tnum"' };
const GLASS = { backdropFilter: "blur(20px) saturate(180%)", WebkitBackdropFilter: "blur(20px) saturate(180%)" };
const MORANDI = ["#A7B0A0", "#B6A89A", "#9FAEB8", "#C2A9A1", "#A9A2AE", "#B8AE94", "#93A29A", "#C4B2A0"];
const MORANDI_SWATCHES = ["#A7B0A0", "#9FAEB8", "#C2A9A1", "#A9A2AE", "#B8AE94", "#93A29A", "#C4B2A0", "#B6A89A", "#8E97A8", "#C0876E"];

/* ═══════════ 货币 & 分类 ═══════════ */
const CURRENCIES = [
  ["CNY", "¥", "人民币", "🇨🇳"], ["USD", "$", "美元", "🇺🇸"], ["EUR", "€", "欧元", "🇪🇺"], ["JPY", "¥", "日元", "🇯🇵"],
  ["GBP", "£", "英镑", "🇬🇧"], ["KRW", "₩", "韩元", "🇰🇷"], ["HKD", "HK$", "港币", "🇭🇰"], ["SGD", "S$", "新加坡元", "🇸🇬"],
  ["THB", "฿", "泰铢", "🇹🇭"], ["MYR", "RM", "林吉特", "🇲🇾"], ["AUD", "A$", "澳元", "🇦🇺"], ["CHF", "Fr", "瑞郎", "🇨🇭"],
  ["CAD", "C$", "加元", "🇨🇦"], ["TWD", "NT$", "新台币", "🇹🇼"], ["VND", "₫", "越南盾", "🇻🇳"], ["IDR", "Rp", "印尼盾", "🇮🇩"],
  ["INR", "₹", "卢比", "🇮🇳"], ["AED", "د.إ", "迪拉姆", "🇦🇪"], ["TRY", "₺", "里拉", "🇹🇷"], ["RUB", "₽", "卢布", "🇷🇺"],
  ["NZD", "NZ$", "新西兰元", "🇳🇿"], ["PHP", "₱", "比索", "🇵🇭"],
].map(([code, sym, name, flag]) => ({ code, sym, name, flag }));
const curOf = (c) => CURRENCIES.find((x) => x.code === c) || { code: c, sym: "", name: c, flag: "🏳️" };
const noDec = (c) => ["JPY", "KRW", "VND", "IDR"].includes(c);

const CATS = [
  { id: "food", name: "餐饮", color: "#C0876E", Icon: Utensils },
  { id: "transit", name: "交通", color: "#7E93A3", Icon: Bus },
  { id: "stay", name: "住宿", color: "#9389A0", Icon: BedDouble },
  { id: "shop", name: "购物", color: "#C193A0", Icon: ShoppingBag },
  { id: "fun", name: "娱乐", color: "#A98798", Icon: Smile },
  { id: "sight", name: "门票景点", color: "#8FA585", Icon: Camera },
  { id: "comm", name: "通讯", color: "#8C97A2", Icon: Wifi },
  { id: "med", name: "医疗", color: "#BD8278", Icon: HeartPulse },
  { id: "biz", name: "公务", color: "#94897C", Icon: Briefcase },
  { id: "other", name: "其他", color: "#ABA396", Icon: Tag },
];
const catOf = (id) => CATS.find((c) => c.id === id) || CATS[CATS.length - 1];

const FLAGS = { "日本": "🇯🇵", "中国": "🇨🇳", "韩国": "🇰🇷", "泰国": "🇹🇭", "新加坡": "🇸🇬", "马来西亚": "🇲🇾", "越南": "🇻🇳", "印度尼西亚": "🇮🇩", "印尼": "🇮🇩", "菲律宾": "🇵🇭", "印度": "🇮🇳", "阿联酋": "🇦🇪", "土耳其": "🇹🇷", "英国": "🇬🇧", "法国": "🇫🇷", "德国": "🇩🇪", "意大利": "🇮🇹", "西班牙": "🇪🇸", "希腊": "🇬🇷", "葡萄牙": "🇵🇹", "瑞士": "🇨🇭", "荷兰": "🇳🇱", "美国": "🇺🇸", "加拿大": "🇨🇦", "澳大利亚": "🇦🇺", "新西兰": "🇳🇿", "俄罗斯": "🇷🇺", "香港": "🇭🇰", "台湾": "🇹🇼", "埃及": "🇪🇬", "摩洛哥": "🇲🇦", "冰岛": "🇮🇸", "挪威": "🇳🇴", "瑞典": "🇸🇪", "奥地利": "🇦🇹", "捷克": "🇨🇿", "墨西哥": "🇲🇽", "巴西": "🇧🇷", "南非": "🇿🇦" };
const flagFor = (country) => { if (!country) return "🌍"; for (const k in FLAGS) if (country.includes(k)) return FLAGS[k]; return "🌍"; };

/* ═══════════ 存储 / 汇率 / 工具 ═══════════ */
/* ═══════════ 存储降级服务：window.storage → localStorage → 内存 —— 逻辑与 tests/storage.test.mjs 同源，20 断言通过 ═══════════ */
const STORE_PROBE_KEY = "tcw:__probe__";
function _wsBackend(ws) { return { name: "window.storage", persistent: true, async get(k) { const r = await ws.get(k); return r == null ? null : r.value; }, async set(k, v) { await ws.set(k, v); }, async del(k) { await ws.delete(k); } }; }
function _lsBackend(ls) { return { name: "localStorage", persistent: true, async get(k) { const v = ls.getItem(k); return v == null ? null : v; }, async set(k, v) { ls.setItem(k, v); }, async del(k) { ls.removeItem(k); } }; }
function _memBackend() { const m = new Map(); return { name: "memory", persistent: false, async get(k) { return m.has(k) ? m.get(k) : null; }, async set(k, v) { m.set(k, v); }, async del(k) { m.delete(k); } }; }
function _idbBackend(idbFactory) {
  const DBN = "tcw-db", STN = "kv"; let dbP = null;
  const open = () => dbP || (dbP = new Promise((res, rej) => { let rq; try { rq = idbFactory.open(DBN, 1); } catch (e) { rej(e); return; } rq.onupgradeneeded = () => { try { rq.result.createObjectStore(STN); } catch { } }; rq.onsuccess = () => res(rq.result); rq.onerror = () => rej(rq.error || new Error("idb open")); rq.onblocked = () => rej(new Error("idb blocked")); }));
  const run = async (mode, fn) => { const db = await open(); return new Promise((res, rej) => { const st = db.transaction(STN, mode).objectStore(STN); const rq = fn(st); rq.onsuccess = () => res(rq.result); rq.onerror = () => rej(rq.error || new Error("idb tx")); }); };
  return { name: "indexedDB", persistent: true, async get(k) { const v = await run("readonly", (st) => st.get(k)); return v == null ? null : v; }, async set(k, v) { await run("readwrite", (st) => st.put(v, k)); }, async del(k) { await run("readwrite", (st) => st.delete(k)); } };
}
async function _migrateLSTo(ls, backend, prefix = "tcw:") { let copied = 0; try { const keys = []; for (let i = 0; i < ls.length; i++) { const k = ls.key(i); if (k && k.startsWith(prefix) && k !== STORE_PROBE_KEY) keys.push(k); } for (const k of keys) { const existing = await backend.get(k); if (existing == null) { const v = ls.getItem(k); if (v != null) { await backend.set(k, v); copied++; } } } } catch { } return copied; }
async function _probeBackend(b) { try { const token = "p" + Math.random().toString(36).slice(2, 8); await b.set(STORE_PROBE_KEY, token); const got = await b.get(STORE_PROBE_KEY); await b.del(STORE_PROBE_KEY).catch(() => {}); return got === token; } catch { return false; } }
function _storeCandidates() { const w = typeof window !== "undefined" ? window : undefined; const out = []; if (w && w.storage && typeof w.storage.get === "function") out.push(_wsBackend(w.storage)); try { if (w && w.indexedDB) out.push(_idbBackend(w.indexedDB)); } catch { } try { if (w && w.localStorage) out.push(_lsBackend(w.localStorage)); } catch { } return out; }
const _storeListeners = new Set();
let _storeStatus = { backend: null, persistent: true, writeFailed: false };
function _createStore(candidates) {
  let active = null; let writeFailed = false;
  const status = () => ({ backend: active ? active.name : null, persistent: active ? active.persistent && !writeFailed : false, writeFailed });
  const notify = () => { _storeStatus = status(); _storeListeners.forEach((f) => { try { f(_storeStatus); } catch { } }); };
  const ready = (async () => {
    for (const b of candidates || []) { if (b && (await _probeBackend(b))) { active = b; break; } }
    if (!active) active = _memBackend();
    if (active.name === "indexedDB") { try { const w = typeof window !== "undefined" ? window : undefined; if (w && w.localStorage) await _migrateLSTo(w.localStorage, active); } catch { } }
    notify(); return status();
  })();
  return {
    ready, status,
    async get(k) { await ready; try { const raw = await active.get(k); return raw == null ? null : JSON.parse(raw); } catch { return null; } },
    async set(k, v) { await ready; try { await active.set(k, JSON.stringify(v)); if (writeFailed) { writeFailed = false; notify(); } return true; } catch { if (!writeFailed) { writeFailed = true; notify(); } return false; } },
    async del(k) { await ready; try { await active.del(k); return true; } catch { return false; } },
  };
}
const store = _createStore(_storeCandidates());
const subscribeStore = (f) => { _storeListeners.add(f); if (_storeStatus.backend) { try { f(_storeStatus); } catch { } } return () => _storeListeners.delete(f); };
const K = { exp: "tcw:expenses", trips: "tcw:trips", rates: "tcw:rates", set: "tcw:settings", pidx: "tcw:places" };
const pKey = (id) => "tcw:place:" + id;

async function fetchRates() {
  const urls = ["https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/cny.json", "https://latest.currency-api.pages.dev/v1/currencies/cny.json"];
  for (const u of urls) { try { const r = await fetch(u); if (!r.ok) continue; const d = await r.json(); if (d && d.cny) return { map: d.cny, date: d.date, fetchedAt: Date.now() }; } catch { } }
  return null;
}
const fmt = (n, dp = 2) => (n ?? 0).toLocaleString("zh-CN", { minimumFractionDigits: dp, maximumFractionDigits: dp });
const today = () => { const d = new Date(); return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`; };
const uid = () => Math.random().toString(36).slice(2, 10);
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const hashNum = (s) => { let h = 5381; const t = s || "x"; for (let i = 0; i < t.length; i++) h = ((h * 33) ^ t.charCodeAt(i)) >>> 0; return h; };
const blockColor = (seed) => MORANDI[hashNum(seed || "x") % MORANDI.length];
const mdDate = (iso) => { if (!iso) return ""; const [y, m, d] = iso.split("-"); return `${+m}月${+d}日`; };
const fmtRange = (s, e) => s && e ? `${mdDate(s)} – ${mdDate(e)}` : s ? mdDate(s) : "";

function fileToResized(file, max = 1280, q = 0.85) {
  return new Promise((res, rej) => { const r = new FileReader(); r.onload = () => { const img = new Image(); img.onload = () => {
    let { width: w, height: h } = img; if (w >= h && w > max) { h = (h * max) / w; w = max; } else if (h > w && h > max) { w = (w * max) / h; h = max; }
    const c = document.createElement("canvas"); c.width = w; c.height = h; c.getContext("2d").drawImage(img, 0, 0, w, h); res(c.toDataURL("image/jpeg", q));
  }; img.onerror = rej; img.src = r.result; }; r.onerror = rej; r.readAsDataURL(file); });
}
function shrinkDataUrl(dataUrl, max = 420, q = 0.66) {
  return new Promise((res) => { const img = new Image(); img.onload = () => {
    let { width: w, height: h } = img; if (w >= h && w > max) { h = (h * max) / w; w = max; } else if (h > w && h > max) { w = (w * max) / h; h = max; }
    const c = document.createElement("canvas"); c.width = w; c.height = h; c.getContext("2d").drawImage(img, 0, 0, w, h); res(c.toDataURL("image/jpeg", q));
  }; img.onerror = () => res(null); img.src = dataUrl; });
}
function loadScript(src) { return new Promise((res, rej) => { if ([...document.scripts].some((s) => s.src === src)) return res(); const s = document.createElement("script"); s.src = src; s.onload = res; s.onerror = rej; document.head.appendChild(s); }); }
async function geocode(q) {
  const r = await fetch(`https://nominatim.openstreetmap.org/search?format=jsonv2&limit=1&accept-language=zh&q=${encodeURIComponent(q)}`); const d = await r.json();
  if (d && d[0]) { const parts = (d[0].display_name || "").split(",").map((x) => x.trim()); return { lat: +d[0].lat, lng: +d[0].lon, country: parts[parts.length - 1] || "", display: d[0].display_name }; }
  return null;
}
const daysBetween = (s, e) => { if (!s || !e) return 0; const a = new Date(s), b = new Date(e); return Math.max(1, Math.round((b - a) / 864e5) + 1); };

/* ═══════════ 汇率快照服务（历史取汇 · 快照保护 · 迁移）—— 逻辑与 tests/exchangeRate.test.mjs 同源，已 51 断言通过 ═══════════ */
const SCHEMA_VERSION = 2;
const YMD_RE = /^\d{4}-\d{2}-\d{2}$/;
const RATE_CACHE = new Map();
const MAX_LOOKBACK_DAYS = 7;
function isValidYMD(s) { if (typeof s !== "string" || !YMD_RE.test(s)) return false; const [y, m, d] = s.split("-").map(Number); if (m < 1 || m > 12 || d < 1 || d > 31) return false; const dt = new Date(Date.UTC(y, m - 1, d)); return dt.getUTCFullYear() === y && dt.getUTCMonth() === m - 1 && dt.getUTCDate() === d; }
function addDaysStr(s, delta) { const [y, m, d] = s.split("-").map(Number); const dt = new Date(Date.UTC(y, m - 1, d)); dt.setUTCDate(dt.getUTCDate() + delta); return `${dt.getUTCFullYear()}-${String(dt.getUTCMonth() + 1).padStart(2, "0")}-${String(dt.getUTCDate()).padStart(2, "0")}`; }
function roundMoney(n) { if (n == null || !isFinite(n)) return null; return Math.round((n + Number.EPSILON) * 100) / 100; }
function computeCNY(localAmount, rate) { if (localAmount == null || rate == null || !isFinite(localAmount) || !isFinite(rate)) return null; return roundMoney(localAmount * rate); }
function sanitizeAmount(v) { if (v == null || v === "") return null; const n = typeof v === "number" ? v : parseFloat(String(v).trim()); return isFinite(n) ? n : null; }
function normalizeRateToCNY(currencyLower, json) { if (!json || typeof json !== "object") return null; const block = json[currencyLower]; if (!block || typeof block !== "object") return null; const r = block["cny"]; if (typeof r !== "number" || !(r > 0)) return null; return { rate: r, dataDate: typeof json.date === "string" ? json.date : null }; }
function buildRateUrls(c, date) { return [
  `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@${date}/v1/currencies/${c}.min.json`,
  `https://${date}.currency-api.pages.dev/v1/currencies/${c}.min.json`,
  `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@${date}/v1/currencies/${c}.json`,
  `https://${date}.currency-api.pages.dev/v1/currencies/${c}.json`,
]; }
async function fetchRateJson(url) { try { const ctrl = typeof AbortController !== "undefined" ? new AbortController() : null; const t = ctrl ? setTimeout(() => ctrl.abort(), 8000) : null; const r = await fetch(url, ctrl ? { signal: ctrl.signal } : undefined); if (t) clearTimeout(t); if (!r.ok) return null; return await r.json(); } catch { return null; } }
async function fetchCurrencyOnDate(c, date) { for (const url of buildRateUrls(c, date)) { const json = await fetchRateJson(url); if (json) return json; } return null; }
async function getRateForDate({ currency, targetCurrency = "CNY", expenseDate }, opts = {}) {
  const fetchedAt = Date.now();
  const cur = String(currency || "").toLowerCase(); const target = String(targetCurrency || "CNY").toLowerCase();
  if (!isValidYMD(expenseDate)) return { rate: null, requestedRateDate: expenseDate ?? null, appliedRateDate: null, source: "unavailable", mode: "pending", status: "failed", fetchedAt };
  if (cur === "cny") return { rate: 1, requestedRateDate: expenseDate, appliedRateDate: expenseDate, source: "CNY", mode: "fixed", status: "ready", fetchedAt };
  const key = `${cur}|${target}|${expenseDate}`;
  if (RATE_CACHE.has(key) && !opts.force) return RATE_CACHE.get(key);
  let hit = null, applied = null;
  for (let i = 0; i <= MAX_LOOKBACK_DAYS; i++) { const tryDate = addDaysStr(expenseDate, -i); const json = await fetchCurrencyOnDate(cur, tryDate); const norm = json ? normalizeRateToCNY(cur, json) : null; if (norm) { hit = norm; applied = norm.dataDate || tryDate; break; } }
  const result = hit
    ? { rate: hit.rate, requestedRateDate: expenseDate, appliedRateDate: applied, source: "currency-api", mode: "historical", status: "ready", fetchedAt }
    : { rate: null, requestedRateDate: expenseDate, appliedRateDate: null, source: "unavailable", mode: "pending", status: "failed", fetchedAt };
  RATE_CACHE.set(key, result); return result;
}
function fixedMetaCNY(d) { return { rate: 1, requestedRateDate: d, appliedRateDate: d, source: "CNY", mode: "fixed", status: "ready", fetchedAt: Date.now() }; }
function manualMeta(rate, d) { return { rate, requestedRateDate: d, appliedRateDate: d, source: "manual", mode: "manual", status: "ready", fetchedAt: Date.now() }; }
function makeResolver(getRate) { let seq = 0; return function (params) { const my = ++seq; const promise = Promise.resolve(getRate(params)).then((res) => ({ res, seq: my, current: my === seq })); return { seq: my, promise }; }; }
async function resolveExpense(orig, input) {
  const currency = input.currency, expenseDate = input.expenseDate, localAmount = sanitizeAmount(input.localAmount);
  const manualProvided = input.manualRate != null && isFinite(input.manualRate);
  const manualChanged = manualProvided && (!orig || orig.rateMode !== "manual" || orig.rate !== input.manualRate);
  const rateAffectingChanged = !orig || orig.currency !== currency || (orig.expenseDate ?? orig.date) !== expenseDate || manualChanged || (orig.rateMode === "manual" && !manualProvided && input.manualTouched === true);
  if (orig && !rateAffectingChanged) {
    return { ...orig, localAmount, cnyAmount: computeCNY(localAmount, orig.rate), category: input.category ?? orig.category, tripId: input.tripId ?? orig.tripId, note: input.note ?? orig.note, merchant: input.merchant ?? orig.merchant, settledCNY: input.settledCNY !== undefined ? input.settledCNY : (orig.settledCNY ?? null), updatedAt: Date.now() };
  }
  let meta;
  if (currency === "CNY") meta = fixedMetaCNY(expenseDate);
  else if (manualProvided) meta = manualMeta(input.manualRate, expenseDate);
  else meta = await getRateForDate({ currency, targetCurrency: "CNY", expenseDate });
  return {
    id: orig?.id ?? input.id ?? uid(), localAmount, currency, expenseDate,
    rate: meta.rate, requestedRateDate: meta.requestedRateDate, appliedRateDate: meta.appliedRateDate, rateSource: meta.source, rateMode: meta.mode, rateStatus: meta.status, rateFetchedAt: meta.fetchedAt,
    cnyAmount: computeCNY(localAmount, meta.rate), settledCNY: input.settledCNY !== undefined ? input.settledCNY : (orig?.settledCNY ?? null),
    category: input.category ?? orig?.category ?? "other", tripId: input.tripId ?? orig?.tripId ?? "none", note: input.note ?? orig?.note ?? "", merchant: input.merchant ?? orig?.merchant ?? "",
    createdAt: orig?.createdAt ?? Date.now(), updatedAt: Date.now(), schemaVersion: SCHEMA_VERSION,
  };
}
function migrateExpense(e) {
  if (!e || typeof e !== "object") return e;
  if (e.schemaVersion >= SCHEMA_VERSION) return e;
  const expenseDate = e.expenseDate || e.date; const isCNY = e.currency === "CNY"; const hasRate = typeof e.rate === "number" && e.rate > 0;
  return { ...e, expenseDate, rate: e.rate ?? (isCNY ? 1 : null), requestedRateDate: e.requestedRateDate ?? expenseDate ?? null, appliedRateDate: e.appliedRateDate ?? e.rateDate ?? (isCNY ? expenseDate : null), rateSource: e.rateSource ?? (isCNY ? "CNY" : "legacy"), rateMode: e.rateMode ?? (isCNY ? "fixed" : "legacy"), rateStatus: e.rateStatus ?? ((isCNY || e.cnyAmount != null || hasRate) ? "ready" : "pending"), rateFetchedAt: e.rateFetchedAt ?? null, cnyAmount: e.cnyAmount ?? (isCNY ? e.localAmount : null), settledCNY: e.settledCNY ?? null, createdAt: e.createdAt ?? e.created ?? null, updatedAt: e.updatedAt ?? e.created ?? null, schemaVersion: SCHEMA_VERSION };
}
function migrateAllExpenses(list) { const arr = Array.isArray(list) ? list : []; let changed = false; const out = arr.map((e) => { const m = migrateExpense(e); if (m !== e) changed = true; return m; }); return { list: out, changed }; }
function isPendingRate(e) { if (!e) return false; if (e.currency === "CNY") return false; if (e.rateMode === "manual") return false; return e.rate == null && (e.rateStatus === "pending" || e.rateStatus === "failed" || e.rateStatus == null); }
async function backfillExpense(e) { if (!isPendingRate(e)) return e; const date = e.expenseDate || e.date; const meta = await getRateForDate({ currency: e.currency, targetCurrency: "CNY", expenseDate: date }, { force: true }); if (!meta || meta.status !== "ready" || meta.rate == null) return e; return { ...e, rate: meta.rate, requestedRateDate: meta.requestedRateDate, appliedRateDate: meta.appliedRateDate, rateSource: meta.source, rateMode: "historical", rateStatus: "ready", rateFetchedAt: meta.fetchedAt, cnyAmount: computeCNY(e.localAmount, meta.rate), date, updatedAt: Date.now() }; }
async function backfillPending(expenses) { const list = Array.isArray(expenses) ? [...expenses] : []; let filled = 0; for (let i = 0; i < list.length; i++) { if (!isPendingRate(list[i])) continue; const after = await backfillExpense(list[i]); if (after !== list[i] && after.rateStatus === "ready") { list[i] = after; filled++; } } return { list, filled, remaining: list.filter(isPendingRate).length, changed: filled > 0 }; }


/* ═══════════════════════ 主组件 ═══════════════════════ */
function App() {
  const [ready, setReady] = useState(false);
  const [expenses, setExpenses] = useState([]);
  const [trips, setTrips] = useState([]);
  const [rates, setRates] = useState(null);
  const [settings, setSettings] = useState({ activeTripId: "all" });
  const [places, setPlaces] = useState([]);
  const [rateStatus, setRateStatus] = useState("idle");
  const [hide, setHide] = useState(false);

  const [tab, setTab] = useState("list");
  const [search, setSearch] = useState("");
  const [catFilter, setCatFilter] = useState("all");
  const [editing, setEditing] = useState(null);
  const [tripModal, setTripModal] = useState(null);
  const [placeModal, setPlaceModal] = useState(null);
  const [openPlace, setOpenPlace] = useState(null);
  const [menu, setMenu] = useState(false);
  const [bgEdit, setBgEdit] = useState(false);
  const [toast, setToast] = useState(null);
  const [storageWarn, setStorageWarn] = useState(null);
  useEffect(() => subscribeStore((s) => {
    if (!s.backend) return;
    if (s.backend === "memory") setStorageWarn("数据不会保存：当前环境无可用存储，刷新即丢失");
    else if (s.writeFailed) setStorageWarn("保存失败：存储空间可能已满，最新更改未写入");
    else setStorageWarn(null);
  }), []);

  const backfillingRef = useRef(false);
  const expensesRef = useRef([]);
  useEffect(() => { expensesRef.current = expenses; }, [expenses]);

  useEffect(() => { (async () => {
    const [e, t, r, s, p] = await Promise.all([store.get(K.exp), store.get(K.trips), store.get(K.rates), store.get(K.set), store.get(K.pidx)]);
    const loadedExp = e ? migrateAllExpenses(e).list : [];
    setExpenses(loadedExp); if (e && migrateAllExpenses(e).changed) store.set(K.exp, loadedExp);
    if (t) setTrips(t); if (s) setSettings(s); if (p) setPlaces(p);
    if (r) { setRates(r); setRateStatus("ok"); }
    setReady(true);
    const f = await fetchRates(); if (f) { setRates(f); setRateStatus("ok"); store.set(K.rates, f); } else if (!r) setRateStatus("fail");
    // 载入后自动补齐待补录汇率（仅在线、仅 pending，不触碰已就绪/手动）
    if (loadedExp.some(isPendingRate) && (typeof navigator === "undefined" || navigator.onLine !== false) && !backfillingRef.current) {
      backfillingRef.current = true;
      const res = await backfillPending(loadedExp);
      backfillingRef.current = false;
      if (res.changed) { setExpenses(res.list); store.set(K.exp, res.list); showToast(`已自动补齐 ${res.filled} 笔汇率`); }
    }
  })(); }, []);

  const runBackfill = async (silent) => {
    if (backfillingRef.current) return;
    if (typeof navigator !== "undefined" && navigator.onLine === false) { if (!silent) showToast("当前离线，联网后自动补齐"); return; }
    const cur = expensesRef.current;
    if (!cur.some(isPendingRate)) { if (!silent) showToast("没有待补录的汇率"); return; }
    backfillingRef.current = true; if (!silent) showToast("正在补齐待补录汇率…");
    const res = await backfillPending(cur);
    backfillingRef.current = false;
    if (res.changed) { setExpenses(res.list); store.set(K.exp, res.list); }
    if (!silent) showToast(res.remaining ? `已补齐 ${res.filled} 笔，仍有 ${res.remaining} 笔待补` : (res.filled ? `已补齐 ${res.filled} 笔` : "仍无法获取，稍后再试"));
  };
  useEffect(() => { const h = () => runBackfill(true); if (typeof window !== "undefined") window.addEventListener("online", h); return () => { if (typeof window !== "undefined") window.removeEventListener("online", h); }; }, []);
  const pendingCount = useMemo(() => expenses.filter(isPendingRate).length, [expenses]);

  const refreshRates = async () => { setRateStatus("loading"); const f = await fetchRates(); if (f) { setRates(f); setRateStatus("ok"); store.set(K.rates, f); showToast("汇率已更新"); } else setRateStatus(rates ? "ok" : "fail"); };
  const persistExp = (n) => { setExpenses(n); store.set(K.exp, n); };
  const persistTrips = (n) => { setTrips(n); store.set(K.trips, n); };
  const persistSet = (n) => { setSettings(n); store.set(K.set, n); };
  const persistPlaces = (n) => { setPlaces(n); store.set(K.pidx, n); };
  const showToast = (m) => { setToast(m); setTimeout(() => setToast(null), 1900); };

  const activeTrip = settings.activeTripId === "all" ? null : trips.find((t) => t.id === settings.activeTripId);
  const scoped = useMemo(() => {
    let l = expenses;
    if (settings.activeTripId !== "all") l = l.filter((e) => e.tripId === settings.activeTripId);
    if (catFilter !== "all") l = l.filter((e) => e.category === catFilter);
    if (search.trim()) { const q = search.trim().toLowerCase(); l = l.filter((e) => (e.note || "").toLowerCase().includes(q) || (e.merchant || "").toLowerCase().includes(q) || e.currency.toLowerCase().includes(q)); }
    return [...l].sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : b.created - a.created));
  }, [expenses, settings.activeTripId, catFilter, search]);
  const totalCNY = useMemo(() => scoped.reduce((s, e) => s + (e.cnyAmount || 0), 0), [scoped]);
  const tripSpend = (id) => expenses.filter((e) => e.tripId === id).reduce((s, e) => s + (e.cnyAmount || 0), 0);
  const tripExpCount = (id) => expenses.filter((e) => e.tripId === id).length;

  async function saveExpense(input) {
    const orig = input.id ? expenses.find((x) => x.id === input.id) : null;
    const snap = await resolveExpense(orig, input);
    const rec = { ...snap, date: snap.expenseDate, created: snap.createdAt }; // 镜像旧字段，兼容其余页面
    const exists = !!orig;
    persistExp(exists ? expenses.map((e) => (e.id === rec.id ? rec : e)) : [rec, ...expenses]);
    setEditing(null); showToast(exists ? "已更新" : "已记账");
  }
  const deleteExpense = (id) => { persistExp(expenses.filter((e) => e.id !== id)); setEditing(null); showToast("已删除"); };
  function saveTrip(form) {
    const rec = { id: form.id || uid(), name: form.name.trim() || "未命名行程", currency: form.currency || "USD", budgetCNY: form.budgetCNY ? parseFloat(form.budgetCNY) : null, cover: form.cover || null, color: form.color || null, startDate: form.startDate || null, endDate: form.endDate || null, created: form.created || Date.now() };
    const exists = trips.some((t) => t.id === rec.id);
    persistTrips(exists ? trips.map((t) => (t.id === rec.id ? rec : t)) : [rec, ...trips]);
    setTripModal(null); if (!exists) persistSet({ ...settings, activeTripId: rec.id }); showToast(exists ? "已更新" : "已创建");
  }
  function deleteTrip(id) { persistTrips(trips.filter((t) => t.id !== id)); persistExp(expenses.map((e) => (e.tripId === id ? { ...e, tripId: "none" } : e))); if (settings.activeTripId === id) persistSet({ ...settings, activeTripId: "all" }); setTripModal(null); showToast("已删除"); }
  function exportCSV() {
    const rows = [["日期", "行程", "分类", "商家", "币种", "当地金额", "汇率", "人民币", "备注"]];
    scoped.forEach((e) => rows.push([e.date, trips.find((t) => t.id === e.tripId)?.name || "", catOf(e.category).name, e.merchant || "", e.currency, e.localAmount, e.rate ? e.rate.toFixed(6) : "", e.cnyAmount?.toFixed(2) ?? "", (e.note || "").replace(/"/g, '""')]));
    const csv = "\uFEFF" + rows.map((r) => r.map((c) => `"${c}"`).join(",")).join("\n");
    const a = document.createElement("a"); a.href = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8" })); a.download = `旅行账本_${today()}.csv`; a.click(); setMenu(false); showToast("已导出 CSV");
  }
  async function savePlace(form, photos) {
    const id = form.id || uid();
    const bigCover = photos?.[0] || form.cover || null;
    const thumb = photos?.[0] ? await shrinkDataUrl(photos[0]) : (form.cover || null);
    const meta = { id, name: form.name, country: form.country || "", lat: form.lat, lng: form.lng, date: form.date || today(), tripId: form.tripId || "none", cover: thumb, saved: form.saved || false, created: form.created || Date.now() };
    const full = { ...meta, cover: bigCover, note: form.note || "", photos: photos || form.photos || [] };
    await store.set(pKey(id), full);
    const exists = places.some((p) => p.id === id);
    persistPlaces(exists ? places.map((p) => (p.id === id ? meta : p)) : [meta, ...places]);
    setPlaceModal(null); showToast(exists ? "地点已更新" : "已添加足迹");
  }
  async function deletePlace(id) { await store.del(pKey(id)); persistPlaces(places.filter((p) => p.id !== id)); setOpenPlace(null); setPlaceModal(null); showToast("已删除"); }
  function toggleSavedPlace(p) { persistPlaces(places.map((x) => x.id === p.id ? { ...x, saved: !x.saved } : x)); }
  function applyBg(cover, color) {
    if (activeTrip) persistTrips(trips.map((t) => t.id === activeTrip.id ? { ...t, cover, color } : t));
    else persistSet({ ...settings, homeCover: cover, homeColor: color });
    setBgEdit(false); showToast("背景已更新");
  }

  if (!ready) return <Shell><div className="flex items-center justify-center text-sm" style={{ minHeight: 540, color: C.sec }}>载入中…</div></Shell>;
  const addAction = { list: () => setEditing("new"), stats: () => setEditing("new"), map: () => setPlaceModal("new"), trips: () => setTripModal("new") };

  return (
    <Shell>
      <div className="flex-1 overflow-y-auto" style={{ position: "relative" }}>
        {tab === "list" && <ListScreen {...{ scoped, expenses, trips, activeTrip, activeId: settings.activeTripId, totalCNY, hide, setHide, rateStatus, rates, search, setSearch, catFilter, setCatFilter, homeCover: settings.homeCover, homeColor: settings.homeColor, onPickTrip: (id) => persistSet({ ...settings, activeTripId: id }), onEdit: setEditing, onMenu: () => setMenu(true), onStats: () => setTab("stats"), onCustomizeBg: () => setBgEdit(true) }} />}
        {tab === "stats" && <StatsScreen {...{ expenses, trips, activeTrip, activeId: settings.activeTripId, hide, setHide, rates, homeCover: settings.homeCover, homeColor: settings.homeColor, onPickTrip: (id) => persistSet({ ...settings, activeTripId: id }), onMenu: () => setMenu(true), onCustomizeBg: () => setBgEdit(true) }} />}
        {tab === "map" && <MapScreen {...{ places, trips, expenses, tripSpend, onOpen: setOpenPlace, onToggleSaved: toggleSavedPlace, onMenu: () => setMenu(true), onStats: () => setTab("stats") }} />}
        {tab === "trips" && <TripsScreen {...{ trips, activeId: settings.activeTripId, hide, setHide, tripSpend, tripExpCount, onOpen: (id) => { persistSet({ ...settings, activeTripId: id }); setTab("list"); }, onEdit: setTripModal, onNew: () => setTripModal("new"), onMenu: () => setMenu(true), onStats: () => setTab("stats") }} />}
      </div>

      <button onClick={addAction[tab]} aria-label="新增" className="absolute flex items-center justify-center rounded-full active:scale-95 transition-transform"
        style={{ right: 18, bottom: "calc(74px + env(safe-area-inset-bottom))", width: 56, height: 56, background: C.accent, color: "#fff", zIndex: 40, boxShadow: "0 8px 22px rgba(255,79,98,.4)" }}>
        <Plus size={27} strokeWidth={2.6} /></button>

      <BottomTab tab={tab} setTab={setTab} />

      {editing && <ExpenseSheet init={editing === "new" ? null : editing} trips={trips} rates={rates} activeTripId={settings.activeTripId} onClose={() => setEditing(null)} onSave={saveExpense} onDelete={deleteExpense} />}
      {tripModal && <TripSheet init={tripModal === "new" ? null : tripModal} onClose={() => setTripModal(null)} onSave={saveTrip} onDelete={deleteTrip} />}
      {placeModal && <PlaceSheet init={placeModal === "new" ? null : placeModal} trips={trips} onClose={() => setPlaceModal(null)} onSave={savePlace} onDelete={deletePlace} />}
      {openPlace && <PlaceDetail meta={openPlace} trips={trips} tripSpend={tripSpend} onClose={() => setOpenPlace(null)} onEdit={(full) => { setOpenPlace(null); setPlaceModal(full); }} onToggleSaved={toggleSavedPlace} />}
      {menu && <ActionMenu onClose={() => setMenu(false)} onExport={exportCSV} onRefresh={() => { setMenu(false); refreshRates(); }} onBackfill={() => { setMenu(false); runBackfill(false); }} pendingCount={pendingCount} />}
      {bgEdit && <BackgroundSheet init={activeTrip ? { cover: activeTrip.cover, color: activeTrip.color } : { cover: settings.homeCover, color: settings.homeColor }} label={activeTrip ? activeTrip.name : "「全部」"} onClose={() => setBgEdit(false)} onSave={applyBg} />}
      {storageWarn && <div className="absolute left-0 right-0 flex items-center justify-center gap-1.5 px-4" style={{ top: 0, paddingTop: "max(env(safe-area-inset-top), 8px)", paddingBottom: 8, background: "rgba(255,79,98,.96)", color: "#fff", zIndex: 80, fontSize: 12.5, fontWeight: 600, backdropFilter: "blur(8px)" }}><AlertTriangle size={14} /> {storageWarn}</div>}
      {toast && <div className="absolute left-1/2 -translate-x-1/2 px-4 py-2 rounded-full text-sm flex items-center gap-1.5" style={{ bottom: 100, background: "rgba(17,17,19,.92)", color: "#fff", zIndex: 70, fontWeight: 500 }}><Check size={14} /> {toast}</div>}
    </Shell>
  );
}

/* ═══════════ 外壳（桌面 430 居中 / 手机铺满） ═══════════ */
function Shell({ children }) {
  return <div style={{ minHeight: "100%", background: "#EBEBEE", display: "flex", justifyContent: "center" }}>
    <div style={{ width: "100%", maxWidth: 430, minHeight: "100vh", height: "100vh", background: C.bg, color: C.ink, fontFamily: FONT, WebkitFontSmoothing: "antialiased", display: "flex", flexDirection: "column", position: "relative", overflow: "hidden" }}>{children}</div>
  </div>;
}

/* ═══════════ 通用元件 ═══════════ */
function GlassBtn({ children, onClick, onPhoto }) {
  return <button onClick={onClick} className="flex items-center justify-center rounded-full active:opacity-60" style={{ width: 38, height: 38, ...GLASS, background: onPhoto ? "rgba(255,255,255,.24)" : "rgba(120,120,128,.14)", color: onPhoto ? "#fff" : C.ink2 }}>{children}</button>;
}
function EyeBtn({ hide, setHide, onPhoto, size = 18 }) {
  return <button onClick={() => setHide(!hide)} className="active:opacity-50" style={{ color: onPhoto ? "rgba(255,255,255,.92)" : C.sec, display: "inline-flex", verticalAlign: "middle" }}>{hide ? <EyeOff size={size} /> : <Eye size={size} />}</button>;
}
const money = (v, hide, dp = 2) => hide ? "••••••" : fmt(v, dp);

/* ═══════════ Hero（照片/默认渐变） ═══════════ */
function Hero({ seed, cover, color, title, onMenu, onStats, onCustomize, children }) {
  const onPhoto = !!cover;
  return (
    <div style={{ position: "relative", overflow: "hidden", borderBottomLeftRadius: 30, borderBottomRightRadius: 30, ...(onPhoto ? {} : { backgroundColor: color || blockColor(seed) }) }}>
      {onPhoto && <img src={cover} alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />}
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(0,0,0,.28) 0%, rgba(0,0,0,.06) 32%, rgba(0,0,0,.46) 100%)" }} />
      <div style={{ position: "relative", padding: "calc(16px + env(safe-area-inset-top)) 20px 26px" }}>
        <div className="flex items-start justify-between">
          <h1 style={{ fontSize: 30, fontWeight: 800, letterSpacing: "-0.03em", color: "#fff", textShadow: "0 1px 10px rgba(0,0,0,.25)" }}>{title}</h1>
          <div className="flex gap-2 pt-1">
            {onCustomize && <GlassBtn onPhoto onClick={onCustomize}><ImagePlus size={16} /></GlassBtn>}
            <GlassBtn onPhoto onClick={onStats}><BarChart3 size={17} /></GlassBtn>
            <GlassBtn onPhoto onClick={onMenu}><MoreHorizontal size={18} /></GlassBtn>
          </div>
        </div>
        {children}
      </div>
    </div>
  );
}

/* ═══════════ 行程胶囊 ═══════════ */
function TripPills({ trips, activeId, onPick }) {
  return <div className="flex gap-2.5 overflow-x-auto px-5" style={{ scrollbarWidth: "none", marginTop: -26, paddingBottom: 4, position: "relative", zIndex: 5 }}>
    {trips.map((t) => { const on = activeId === t.id;
      return <button key={t.id} onClick={() => onPick(t.id)} className="shrink-0 text-left active:scale-95 transition-transform" style={{ ...GLASS, background: on ? C.accentSoft : C.glass, border: `1px solid ${on ? "rgba(255,79,98,.35)" : "rgba(255,255,255,.6)"}`, borderRadius: 16, padding: "9px 15px", minWidth: 96, boxShadow: "0 6px 16px rgba(0,0,0,.08)" }}>
        <div style={{ fontSize: 14, fontWeight: 700, color: on ? C.accentDeep : C.ink }}>{t.name}</div>
        <div style={{ fontSize: 10.5, color: on ? C.accent : C.sec, marginTop: 1, ...NUM }}>{fmtRange(t.startDate, t.endDate) || t.currency}</div>
      </button>; })}
    <button onClick={() => onPick("all")} className="shrink-0 flex flex-col items-center justify-center active:scale-95 transition-transform" style={{ ...GLASS, background: activeId === "all" ? C.accentSoft : C.glass, border: `1px solid ${activeId === "all" ? "rgba(255,79,98,.35)" : "rgba(255,255,255,.6)"}`, borderRadius: 16, padding: "8px 16px", boxShadow: "0 6px 16px rgba(0,0,0,.08)" }}>
      <Briefcase size={15} color={activeId === "all" ? C.accent : C.sec} />
      <div style={{ fontSize: 11, fontWeight: 700, color: activeId === "all" ? C.accentDeep : C.ink, marginTop: 2 }}>全部行程</div>
    </button>
  </div>;
}

/* ═══════════ 明细 ═══════════ */
function ListScreen({ scoped, expenses, trips, activeTrip, activeId, totalCNY, hide, setHide, rateStatus, rates, search, setSearch, catFilter, setCatFilter, homeCover, homeColor, onPickTrip, onEdit, onMenu, onStats, onCustomizeBg }) {
  const grouped = useMemo(() => { const m = new Map(); scoped.forEach((e) => { if (!m.has(e.date)) m.set(e.date, []); m.get(e.date).push(e); }); return [...m.entries()]; }, [scoped]);
  const empty = expenses.length === 0;
  return <div style={{ paddingBottom: 24 }}>
    <Hero seed={activeId} cover={activeTrip ? activeTrip.cover : homeCover} color={activeTrip ? activeTrip.color : homeColor} title="明细" onMenu={onMenu} onStats={onStats} onCustomize={onCustomizeBg}>
      <div className="flex items-center gap-1 mt-1" style={{ color: "rgba(255,255,255,.92)", fontSize: 14, fontWeight: 600 }}>当前行程 <ChevronDown size={15} /></div>
      <div className="flex items-center gap-1.5 mt-4" style={{ color: "rgba(255,255,255,.92)", fontSize: 14, fontWeight: 600 }}>
        <MapPin size={14} />{activeTrip ? activeTrip.name : "全部消费"} · {scoped.length} 笔
      </div>
      <div className="flex items-center gap-2.5" style={{ marginTop: 2 }}>
        <div style={{ fontSize: 42, fontWeight: 800, letterSpacing: "-0.035em", color: "#fff", lineHeight: 1.1, textShadow: "0 1px 12px rgba(0,0,0,.22)", ...NUM }}>
          <span style={{ fontSize: 25, fontWeight: 700, opacity: 0.82 }}>¥ </span>{money(totalCNY, hide)}
        </div>
        <EyeBtn hide={hide} setHide={setHide} onPhoto size={20} />
      </div>
      <div style={{ fontSize: 12.5, color: "rgba(255,255,255,.85)", marginTop: 7, maxWidth: 320, lineHeight: 1.4 }}>费用均为当地货币记录，按交易当天汇率自动换算为人民币</div>
    </Hero>

    <TripPills trips={trips} activeId={activeId} onPick={onPickTrip} />

    <div className="px-4" style={{ marginTop: 14 }}>
      {/* 搜索 */}
      <div className="flex items-center gap-2 mb-3.5">
        <div className="flex items-center gap-2 flex-1 px-4 rounded-2xl" style={{ background: C.card, height: 46, boxShadow: "0 2px 10px rgba(0,0,0,.04)" }}>
          <Search size={17} color={C.sec} /><input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="搜索费用、商家或备注" className="bg-transparent outline-none text-[15px] flex-1" style={{ color: C.ink }} />
        </div>
        <button onClick={() => { setSearch(""); setCatFilter("all"); }} className="flex items-center justify-center rounded-2xl active:opacity-60" style={{ width: 46, height: 46, background: C.card, color: C.ink2, boxShadow: "0 2px 10px rgba(0,0,0,.04)" }}><SlidersHorizontal size={18} /></button>
      </div>

      {/* 分类 */}
      <div className="flex gap-2.5 overflow-x-auto pb-3" style={{ scrollbarWidth: "none" }}>
        <CatTile on={catFilter === "all"} onClick={() => setCatFilter("all")} Icon={LayoutGrid} label="全部" color={C.accent} />
        {CATS.map((c) => <CatTile key={c.id} on={catFilter === c.id} onClick={() => setCatFilter(c.id)} Icon={c.Icon} label={c.name} color={c.color} />)}
      </div>

      {empty ? <Empty Icon={Wallet} title="开始记账" desc="点右下角 ＋ 记一笔。选当地币种填金额，自动折算人民币——两个币种和当天汇率都会留在卡片上。" /> :
        grouped.length === 0 ? <div className="text-center text-sm py-12" style={{ color: C.sec }}>没有符合条件的记录</div> :
          grouped.map(([date, list]) => {
            const dt = list.reduce((s, e) => s + (e.cnyAmount || 0), 0);
            return <div key={date} className="mb-4">
              <div className="flex items-baseline justify-between px-1 mb-2">
                <span style={{ fontSize: 13.5, color: C.sec, fontWeight: 600 }}>{dayLabel(date)}</span>
                <span style={{ fontSize: 12.5, color: C.sec, ...NUM }}>共 {list.length} 笔 · ¥{fmt(dt)}</span>
              </div>
              <div className="flex flex-col gap-2.5">{list.map((e) => <ExpenseCard key={e.id} e={e} trips={trips} onEdit={() => onEdit(e)} />)}</div>
            </div>;
          })}
    </div>
  </div>;
}
function dayLabel(date) { const t = today(); const y = new Date(Date.now() - 864e5).toISOString().slice(0, 10); const md = mdDate(date); return date === t ? `今天 · ${md}` : date === y ? `昨天 · ${md}` : md; }
function CatTile({ on, onClick, Icon, label, color }) {
  return <button onClick={onClick} className="shrink-0 flex flex-col items-center justify-center gap-1 active:scale-95 transition-transform" style={{ width: 60, height: 60, borderRadius: 16, background: on ? C.accentSoft : C.card, border: on ? `1.5px solid rgba(255,79,98,.4)` : `1px solid ${C.sep}`, boxShadow: on ? "none" : "0 2px 8px rgba(0,0,0,.04)" }}>
    <Icon size={20} color={on ? C.accent : color} strokeWidth={2} /><span style={{ fontSize: 11, fontWeight: on ? 700 : 500, color: on ? C.accentDeep : C.ink2 }}>{label}</span>
  </button>;
}

function ExpenseCard({ e, trips, onEdit }) {
  const cat = catOf(e.category), cur = curOf(e.currency), trip = trips.find((t) => t.id === e.tripId), isCNY = e.currency === "CNY";
  const sub = [cat.name, e.merchant || (trip ? trip.name : "")].filter(Boolean).join("  ·  ");
  return <div onClick={onEdit} className="active:opacity-80 transition-opacity" style={{ background: C.card, borderRadius: 18, boxShadow: "0 2px 10px rgba(0,0,0,.04)", cursor: "pointer", overflow: "hidden" }}>
    <div className="flex items-center gap-3" style={{ padding: "13px 14px" }}>
      <div className="flex items-center justify-center shrink-0" style={{ width: 44, height: 44, borderRadius: 13, background: cat.color }}><cat.Icon size={21} color="#fff" strokeWidth={2.1} /></div>
      <div className="min-w-0 flex-1">
        <div style={{ fontSize: 16, fontWeight: 600, color: C.ink, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{e.note || cat.name}</div>
        <div style={{ fontSize: 12.5, color: C.sec, marginTop: 2, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{sub}</div>
      </div>
      <div className="text-right shrink-0" style={{ marginLeft: 6 }}>
        <div style={{ fontSize: 17, fontWeight: 700, color: C.ink, ...NUM }}>{fmt(e.localAmount, noDec(e.currency) ? 0 : 2)} <span style={{ fontSize: 12, fontWeight: 600, color: C.sec }}>{e.currency}</span></div>
        {!isCNY && <div style={{ fontSize: 13, color: C.sec, marginTop: 1, ...NUM }}>≈ ¥{e.cnyAmount != null ? fmt(e.cnyAmount) : "—"}</div>}
      </div>
      <ChevronRight size={17} color={C.ter} style={{ marginLeft: -2, marginRight: -4 }} />
    </div>
    {!isCNY && <div style={{ padding: "7px 14px", background: C.fill, fontSize: 11.5, color: C.sec, ...NUM }}>{e.rate ? <>汇率 {e.rate.toFixed(e.rate < 0.01 ? 5 : 4)} · {e.appliedRateDate || e.rateDate || "—"}{(e.appliedRateDate && (e.expenseDate || e.date) && e.appliedRateDate !== (e.expenseDate || e.date)) ? "（最近有效日）" : ""}{e.rateMode === "manual" ? " · 手动" : ""}</> : <span style={{ color: C.accent }}>汇率待补录 · 消费日 {e.expenseDate || e.date}</span>}</div>}
  </div>;
}

/* ═══════════ 统计 ═══════════ */
function StatsScreen({ expenses, trips, activeTrip, activeId, hide, setHide, rates, homeCover, homeColor, onPickTrip, onMenu, onCustomizeBg }) {
  const [range, setRange] = useState("all");
  const [cs, setCs] = useState(""); const [ce, setCe] = useState("");
  const base = useMemo(() => {
    let l = activeId === "all" ? expenses : expenses.filter((e) => e.tripId === activeId);
    const now = new Date(); const tISO = today();
    if (range === "week") { const w = new Date(Date.now() - 6 * 864e5).toISOString().slice(0, 10); l = l.filter((e) => e.date >= w && e.date <= tISO); }
    else if (range === "month") { const m = tISO.slice(0, 7); l = l.filter((e) => (e.date || "").slice(0, 7) === m); }
    else if (range === "custom" && cs && ce) { l = l.filter((e) => e.date >= cs && e.date <= ce); }
    return l;
  }, [expenses, activeId, range, cs, ce]);
  const total = base.reduce((s, e) => s + (e.cnyAmount || 0), 0);
  const byCat = useMemo(() => { const m = {}; base.forEach((e) => { m[e.category] = (m[e.category] || 0) + (e.cnyAmount || 0); }); return Object.entries(m).map(([id, v]) => ({ ...catOf(id), value: v })).sort((a, b) => b.value - a.value); }, [base]);
  const byCur = useMemo(() => { const m = {}, loc = {}; base.forEach((e) => { m[e.currency] = (m[e.currency] || 0) + (e.cnyAmount || 0); loc[e.currency] = (loc[e.currency] || 0) + (e.localAmount || 0); }); return Object.entries(m).map(([code, v]) => ({ code, value: v, local: loc[code] })).sort((a, b) => b.value - a.value); }, [base]);
  const daily = useMemo(() => { const m = new Map(); base.forEach((e) => m.set(e.date, (m.get(e.date) || 0) + (e.cnyAmount || 0))); return [...m.entries()].sort((a, b) => a[0] < b[0] ? -1 : 1).slice(-7); }, [base]);
  const top = byCat[0];

  return <div style={{ paddingBottom: 24 }}>
    <Hero seed={activeId} cover={activeTrip ? activeTrip.cover : homeCover} color={activeTrip ? activeTrip.color : homeColor} title="统计" onMenu={onMenu} onStats={() => { }} onCustomize={onCustomizeBg}>
      <div className="flex items-center gap-1 mt-1" style={{ color: "rgba(255,255,255,.92)", fontSize: 14, fontWeight: 600 }}>{activeTrip ? activeTrip.name : "全部"} <ChevronDown size={15} /></div>
      <div className="flex items-center gap-1.5 mt-4" style={{ color: "rgba(255,255,255,.92)", fontSize: 13.5, fontWeight: 600 }}>总支出 <EyeBtn hide={hide} setHide={setHide} onPhoto size={16} /></div>
      <div style={{ fontSize: 40, fontWeight: 800, letterSpacing: "-0.035em", color: "#fff", lineHeight: 1.1, textShadow: "0 1px 12px rgba(0,0,0,.22)", ...NUM }}><span style={{ fontSize: 24, fontWeight: 700, opacity: 0.82 }}>¥ </span>{money(total, hide)}</div>
      <div style={{ fontSize: 12.5, color: "rgba(255,255,255,.85)", marginTop: 5 }}>共 {base.length} 笔消费</div>
    </Hero>

    {/* 时间筛选 */}
    <div className="flex gap-2 overflow-x-auto px-5" style={{ scrollbarWidth: "none", marginTop: -22, position: "relative", zIndex: 5 }}>
      {[["all", "全部"], ["week", "本周"], ["month", "本月"], ["custom", "自定义"]].map(([k, l]) => { const on = range === k;
        return <button key={k} onClick={() => setRange(k)} className="shrink-0 active:scale-95 transition-transform" style={{ ...GLASS, background: on ? C.accentSoft : C.glass, border: `1px solid ${on ? "rgba(255,79,98,.35)" : "rgba(255,255,255,.6)"}`, borderRadius: 14, padding: "8px 16px", boxShadow: "0 6px 16px rgba(0,0,0,.08)" }}>
          <span style={{ fontSize: 14, fontWeight: 700, color: on ? C.accentDeep : C.ink, display: "flex", alignItems: "center", gap: 5 }}>{l}{k === "custom" && <Calendar size={13} />}</span>
        </button>; })}
    </div>
    {range === "custom" && <div className="flex gap-2 px-5 mt-3">
      <input type="date" value={cs} onChange={(e) => setCs(e.target.value)} className="flex-1 px-3 py-2 rounded-xl outline-none text-sm" style={{ background: C.card, color: C.ink, border: `1px solid ${C.sep}` }} />
      <input type="date" value={ce} onChange={(e) => setCe(e.target.value)} className="flex-1 px-3 py-2 rounded-xl outline-none text-sm" style={{ background: C.card, color: C.ink, border: `1px solid ${C.sep}` }} />
    </div>}

    <div className="px-4" style={{ marginTop: 16 }}>
      {base.length === 0 ? <div className="text-center text-sm py-12" style={{ color: C.sec }}>该范围暂无数据</div> : <>
        {/* 类别概览 */}
        <Card>
          <CardHead title="类别支出概览" />
          <div className="flex items-center gap-4" style={{ marginTop: 12 }}>
            <Donut data={byCat} total={total} />
            <div className="flex-1 flex flex-col gap-2.5">
              {byCat.slice(0, 5).map((c) => { const pct = total > 0 ? c.value / total * 100 : 0;
                return <div key={c.id}>
                  <div className="flex items-center justify-between" style={{ marginBottom: 4 }}>
                    <span className="flex items-center gap-1.5" style={{ fontSize: 13, color: C.ink }}><c.Icon size={13} color={c.color} strokeWidth={2.2} />{c.name}</span>
                    <span style={{ fontSize: 12, color: C.sec, ...NUM }}>{pct.toFixed(0)}% · ¥{fmt(c.value)}</span>
                  </div>
                  <div className="rounded-full overflow-hidden" style={{ height: 5, background: C.fill }}><div style={{ width: `${pct}%`, height: "100%", background: c.color, borderRadius: 3 }} /></div>
                </div>; })}
            </div>
          </div>
        </Card>
        {/* 洞察 */}
        {top && <div className="flex items-center gap-3 mb-4" style={{ background: C.accentSoft, borderRadius: 18, padding: "13px 15px" }}>
          <div className="flex items-center justify-center shrink-0" style={{ width: 34, height: 34, borderRadius: 17, background: "rgba(255,79,98,.16)" }}><Lightbulb size={17} color={C.accent} /></div>
          <div className="flex-1">
            <div style={{ fontSize: 14, fontWeight: 600, color: C.ink }}>{top.name}是{activeTrip ? "本次行程" : "目前"}最大的支出类别</div>
            <div style={{ fontSize: 12.5, color: C.accentDeep, marginTop: 1, ...NUM }}>占总支出的 {total > 0 ? (top.value / total * 100).toFixed(0) : 0}%，共 ¥{fmt(top.value)}</div>
          </div>
          <ChevronRight size={17} color={C.accent} />
        </div>}
        {/* 按货币 */}
        <Card>
          <CardHead title="按货币统计" />
          <div className="flex flex-col gap-3.5" style={{ marginTop: 12 }}>
            {byCur.map((c) => { const cur = curOf(c.code); const pct = total > 0 ? c.value / total * 100 : 0;
              return <div key={c.code}>
                <div className="flex items-center gap-2.5">
                  <span style={{ fontSize: 22 }}>{cur.flag}</span>
                  <div className="flex-1">
                    <div className="flex items-baseline justify-between">
                      <span style={{ fontSize: 14.5, fontWeight: 600 }}>{c.code} <span style={{ fontSize: 12, color: C.sec, fontWeight: 400 }}>{cur.name}</span></span>
                      <span style={{ fontSize: 14, fontWeight: 600, ...NUM }}>{cur.sym}{fmt(c.local, noDec(c.code) ? 0 : 2)}</span>
                    </div>
                    <div className="flex items-center gap-2" style={{ marginTop: 4 }}>
                      <div className="flex-1 rounded-full overflow-hidden" style={{ height: 5, background: C.fill }}><div style={{ width: `${pct}%`, height: "100%", background: C.accent, borderRadius: 3 }} /></div>
                      <span style={{ fontSize: 11.5, color: C.sec, ...NUM }}>{pct.toFixed(1)}%</span>
                    </div>
                  </div>
                </div>
              </div>; })}
          </div>
          <div className="flex items-center justify-between" style={{ marginTop: 12, paddingTop: 10, borderTop: `1px solid ${C.sep}`, fontSize: 11.5, color: C.sec }}>
            <span className="flex items-center gap-1"><AlertTriangle size={11} />汇率参考 {rates?.date ? "· 更新于 " + rates.date : ""}</span>
            {rates && <RefreshCw size={12} />}
          </div>
        </Card>
        {/* 每日趋势 */}
        <Card>
          <CardHead title="每日支出趋势" />
          <DailyTrend data={daily} />
        </Card>
      </>}
    </div>
  </div>;
}
function Card({ children }) { return <div className="mb-4" style={{ background: C.card, borderRadius: 22, padding: 16, boxShadow: "0 2px 12px rgba(0,0,0,.04)" }}>{children}</div>; }
function CardHead({ title }) { return <div className="flex items-center justify-between"><span style={{ fontSize: 16, fontWeight: 700 }}>{title}</span><span className="flex items-center gap-0.5" style={{ fontSize: 12.5, color: C.sec }}>查看全部 <ChevronRight size={14} /></span></div>; }
function Donut({ data, total }) {
  const R = 33, sw = 13, CC = 2 * Math.PI * R; let off = 0;
  return <div style={{ position: "relative", width: 96, height: 96, flexShrink: 0 }}>
    <svg width={96} height={96} viewBox="0 0 96 96" style={{ transform: "rotate(-90deg)" }}>
      <circle cx={48} cy={48} r={R} fill="none" stroke={C.fill} strokeWidth={sw} />
      {data.map((d) => { const frac = total > 0 ? d.value / total : 0; const len = frac * CC; const el = <circle key={d.id} cx={48} cy={48} r={R} fill="none" stroke={d.color} strokeWidth={sw} strokeDasharray={`${len} ${CC - len}`} strokeDashoffset={-off} strokeLinecap="butt" />; off += len; return el; })}
    </svg>
    <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
      <span style={{ fontSize: 10, color: C.sec }}>总计</span>
      <span style={{ fontSize: 12.5, fontWeight: 700, ...NUM }}>¥{fmt(total, 0)}</span>
    </div>
  </div>;
}
function DailyTrend({ data }) {
  const max = Math.max(1, ...data.map((d) => d[1]));
  if (!data.length) return <div className="text-center text-sm py-6" style={{ color: C.sec }}>暂无数据</div>;
  return <div className="flex items-end justify-between" style={{ marginTop: 14, height: 130, gap: 6 }}>
    {data.map(([date, v]) => <div key={date} className="flex-1 flex flex-col items-center justify-end" style={{ height: "100%" }}>
      <span style={{ fontSize: 10, color: C.ink2, marginBottom: 4, ...NUM }}>¥{fmt(v, 0)}</span>
      <div style={{ width: 9, height: `${Math.max(4, v / max * 86)}px`, background: C.accent, borderRadius: 6 }} />
      <span style={{ fontSize: 10, color: C.sec, marginTop: 6, ...NUM }}>{date.slice(5).replace("-", "/")}</span>
    </div>)}
  </div>;
}

/* ═══════════ 足迹 ═══════════ */
function PlainHeader({ title, subtitle, onMenu, onStats }) {
  return <div style={{ padding: "calc(14px + env(safe-area-inset-top)) 20px 8px" }}>
    <div className="flex items-start justify-between">
      <div><h1 style={{ fontSize: 30, fontWeight: 800, letterSpacing: "-0.03em" }}>{title}</h1>{subtitle && <div style={{ fontSize: 13.5, color: C.sec, marginTop: 2 }}>{subtitle}</div>}</div>
      <div className="flex gap-2 pt-1"><GlassBtn onClick={onStats}><BarChart3 size={17} /></GlassBtn><GlassBtn onClick={onMenu}><MoreHorizontal size={18} /></GlassBtn></div>
    </div>
  </div>;
}
function MapScreen({ places, trips, expenses, tripSpend, onOpen, onToggleSaved, onMenu, onStats }) {
  const [world, setWorld] = useState(null); const [err, setErr] = useState(false); const [sel, setSel] = useState(null);
  useEffect(() => { let dead = false; (async () => { try { if (!window.topojson) await loadScript("https://cdn.jsdelivr.net/npm/topojson-client@3/dist/topojson-client.min.js");
    const res = await fetch("https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json"); const topo = await res.json(); const geo = window.topojson.feature(topo, topo.objects.countries); if (!dead) setWorld(geo);
  } catch { if (!dead) setErr(true); } })(); return () => { dead = true; }; }, []);
  const W = 360, H = 250, pad = 26;
  const { paths, pins, journey } = useMemo(() => {
    if (!world) return { paths: [], pins: [], journey: "" };
    const projection = d3.geoNaturalEarth1(); let fit = world;
    if (places.length) { let a = Infinity, b = -Infinity, c = Infinity, d = -Infinity; places.forEach((p) => { a = Math.min(a, p.lng); b = Math.max(b, p.lng); c = Math.min(c, p.lat); d = Math.max(d, p.lat); });
      const pd = Math.max(16, (b - a) * 0.3, (d - c) * 0.3); a -= pd; b += pd; c -= pd; d += pd; fit = { type: "Polygon", coordinates: [[[a, c], [b, c], [b, d], [a, d], [a, c]]] }; }
    try { projection.fitExtent([[pad, pad], [W - pad, H - pad]], fit); } catch { projection.fitExtent([[pad, pad], [W - pad, H - pad]], world); }
    if (projection.scale() > 1300) projection.scale(1300);
    const path = d3.geoPath(projection);
    const paths = world.features.map((f, i) => ({ d: path(f), i }));
    const pins = places.map((p) => { const xy = projection([p.lng, p.lat]); return xy ? { ...p, x: xy[0], y: xy[1] } : null; }).filter(Boolean);
    const sorted = [...places].filter((p) => p.lat != null).sort((a, b) => (a.date < b.date ? -1 : 1)); let journey = "";
    sorted.forEach((p, i) => { const xy = projection([p.lng, p.lat]); if (xy) journey += (i ? " L" : "M") + xy[0].toFixed(1) + " " + xy[1].toFixed(1); });
    return { paths, pins, journey };
  }, [world, places]);
  const countries = new Set(places.map((p) => p.country).filter(Boolean)).size;
  const totalSpend = expenses.reduce((s, e) => s + (e.cnyAmount || 0), 0);
  const travelDays = trips.reduce((s, t) => s + daysBetween(t.startDate, t.endDate), 0) || new Set(expenses.map((e) => e.date)).size;

  return <div style={{ paddingBottom: 24 }}>
    <PlainHeader title="足迹" subtitle="收藏你的旅行足迹" onMenu={onMenu} onStats={onStats} />
    <div className="px-4">
      {/* 地图 */}
      <div style={{ position: "relative", borderRadius: 22, overflow: "hidden", boxShadow: "0 4px 16px rgba(0,0,0,.06)" }}>
        <div style={{ position: "relative", width: "100%", aspectRatio: `${W}/${H}`, background: C.mapWater }}>
          {!world && !err && <div className="absolute inset-0 flex items-center justify-center text-sm" style={{ color: C.sec }}><RefreshCw size={15} className="animate-spin" style={{ marginRight: 6 }} />载入地图…</div>}
          {err && <div className="absolute inset-0 flex flex-col items-center justify-center text-sm gap-1" style={{ color: C.sec }}><AlertTriangle size={18} color={C.accent} />地图载入失败<span style={{ fontSize: 12 }}>下方列表仍可用</span></div>}
          {world && <svg viewBox={`0 0 ${W} ${H}`} style={{ width: "100%", display: "block" }}>
            <rect x={0} y={0} width={W} height={H} fill={C.mapWater} />
            {paths.map((p) => <path key={p.i} d={p.d} fill={C.mapLand} stroke={C.mapLandStroke} strokeWidth={0.4} />)}
            {journey && <path d={journey} fill="none" stroke={C.accent} strokeWidth={1.3} strokeDasharray="2.5 3" opacity={0.85} strokeLinecap="round" />}
            {pins.map((p) => { const anchorEnd = p.x > W * 0.7; return <g key={p.id} onClick={() => onOpen(p)} style={{ cursor: "pointer" }}>
              <path d={`M${p.x} ${p.y} c-4.6 -6 -7 -9 -7 -13 a7 7 0 0 1 14 0 c0 4 -2.4 7 -7 13Z`} fill={C.accent} stroke="#fff" strokeWidth={1.1} />
              <circle cx={p.x} cy={p.y - 13} r={2.4} fill="#fff" />
              <text x={anchorEnd ? p.x - 9 : p.x + 9} y={p.y - 9} fontSize={9} fontWeight={600} fill="#3A3A3C" textAnchor={anchorEnd ? "end" : "start"} stroke="#fff" strokeWidth={2.4} paintOrder="stroke" style={{ fontFamily: FONT }}>{p.name}</text>
            </g>; })}
          </svg>}
          <div className="absolute flex items-center gap-2 px-3 py-2 rounded-xl" style={{ left: 12, top: 12, ...GLASS, background: "rgba(255,255,255,.82)", boxShadow: "0 2px 8px rgba(0,0,0,.1)" }}>
            <Plane size={16} color={C.accent} style={{ transform: "rotate(-15deg)" }} />
            <div><div style={{ fontSize: 13, fontWeight: 700, ...NUM }}>{places.length} 处足迹</div><div style={{ fontSize: 10, color: C.sec }}>{countries} 个国家/地区</div></div>
          </div>
          <button onClick={() => setSel(null)} className="absolute flex items-center justify-center rounded-full active:opacity-60" style={{ right: 12, top: 12, width: 36, height: 36, ...GLASS, background: "rgba(255,255,255,.82)", color: C.ink2, boxShadow: "0 2px 8px rgba(0,0,0,.1)" }}><Crosshair size={17} /></button>
        </div>
      </div>

      {/* 四宫格摘要 */}
      <div className="grid grid-cols-4 mt-3.5" style={{ background: C.card, borderRadius: 18, padding: "14px 4px", boxShadow: "0 2px 10px rgba(0,0,0,.04)" }}>
        <Summary icon={<Globe size={16} color={C.accent} />} value={places.length} label="处足迹" />
        <Summary icon={<Flag size={16} color={C.accent} />} value={countries} label="国家/地区" />
        <Summary icon={<Plane size={16} color={C.accent} />} value={"¥" + fmt(totalSpend, 0)} label="总花费" small />
        <Summary icon={<Calendar size={16} color={C.accent} />} value={travelDays} label="旅行天数" />
      </div>

      {/* 列表 */}
      <div className="flex items-center justify-between px-1" style={{ marginTop: 22, marginBottom: 10 }}>
        <span style={{ fontSize: 18, fontWeight: 700 }}>我的足迹</span>
        <span className="flex items-center gap-0.5" style={{ fontSize: 13, color: C.sec }}>时间排序 <ChevronDown size={14} /></span>
      </div>
      {places.length === 0 ? <Empty Icon={MapPin} title="记录去过的地方" desc="点右下角 ＋ 添加去过的地点，输入地名自动定位，配上照片和简报。" /> :
        <div className="grid grid-cols-2 gap-3">
          {[...places].sort((a, b) => (a.date < b.date ? 1 : -1)).map((p) => <PlaceCard key={p.id} p={p} trip={trips.find((t) => t.id === p.tripId)} spend={p.tripId !== "none" ? tripSpend(p.tripId) : null} onOpen={() => onOpen(p)} onToggleSaved={() => onToggleSaved(p)} />)}
        </div>}
    </div>
  </div>;
}
function Summary({ icon, value, label, small }) {
  return <div className="flex flex-col items-center" style={{ padding: "0 2px" }}>
    <div className="flex items-center justify-center rounded-full mb-1.5" style={{ width: 34, height: 34, background: "rgba(255,79,98,.1)" }}>{icon}</div>
    <div style={{ fontSize: small ? 13 : 17, fontWeight: 700, ...NUM }}>{value}</div>
    <div style={{ fontSize: 10.5, color: C.sec, marginTop: 1 }}>{label}</div>
  </div>;
}
function PlaceCard({ p, trip, spend, onOpen, onToggleSaved }) {
  return <div onClick={onOpen} className="active:scale-[.98] transition-transform" style={{ position: "relative", aspectRatio: "1", borderRadius: 18, overflow: "hidden", cursor: "pointer", background: p.cover ? "#000" : C.mapLand, boxShadow: "0 4px 14px rgba(0,0,0,.1)" }}>
    {p.cover ? <img src={p.cover} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} /> : <div className="w-full h-full flex items-center justify-center"><MapPin size={26} color={C.ter} /></div>}
    <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,.66) 0%, transparent 50%)" }} />
    <div className="absolute flex items-center gap-1 px-2 py-1 rounded-full" style={{ left: 9, top: 9, ...GLASS, background: "rgba(255,255,255,.82)" }}><span style={{ fontSize: 12 }}>{flagFor(p.country)}</span><span style={{ fontSize: 10.5, fontWeight: 600, color: C.ink }}>{p.country || "—"}</span></div>
    <button onClick={(ev) => { ev.stopPropagation(); onToggleSaved(); }} className="absolute flex items-center justify-center rounded-full active:opacity-60" style={{ right: 8, bottom: 8, width: 28, height: 28, ...GLASS, background: "rgba(255,255,255,.85)", color: p.saved ? C.accent : C.sec }}><Bookmark size={14} fill={p.saved ? C.accent : "none"} /></button>
    <div style={{ position: "absolute", left: 11, right: 40, bottom: 10, color: "#fff" }}>
      <div style={{ fontSize: 18, fontWeight: 800, letterSpacing: "-0.02em", lineHeight: 1.1, textShadow: "0 1px 6px rgba(0,0,0,.4)" }}>{p.name}</div>
      <div style={{ fontSize: 10.5, opacity: 0.92, marginTop: 1, ...NUM }}>{mdDate(p.date)}</div>
      {spend != null && <div style={{ fontSize: 14, fontWeight: 700, marginTop: 2, ...NUM }}>¥{fmt(spend)}</div>}
    </div>
  </div>;
}

/* ═══════════ 行程 ═══════════ */
function TripsScreen({ trips, activeId, hide, setHide, tripSpend, tripExpCount, onOpen, onEdit, onNew, onMenu, onStats }) {
  return <div style={{ paddingBottom: 24 }}>
    <PlainHeader title="行程" onMenu={onMenu} onStats={onStats} />
    <div className="px-5" style={{ marginTop: -2, marginBottom: 8 }}><span className="flex items-center gap-1" style={{ fontSize: 14, fontWeight: 600, color: C.ink2 }}>全部行程 <ChevronDown size={15} /></span></div>
    <div className="px-4">
      {trips.length === 0 ? <Empty Icon={Briefcase} title="还没有行程" desc="为每次出行 / 出差建一个行程，独立统计花费、设预算，配上封面。" action="新建行程" onAction={onNew} /> :
        <div className="grid grid-cols-2 gap-3.5">
          {trips.map((t) => { const spend = tripSpend(t.id), n = tripExpCount(t.id), cur = activeId === t.id;
            return <div key={t.id} onClick={() => onOpen(t.id)} className="active:scale-[.98] transition-transform" style={{ background: C.card, borderRadius: 20, overflow: "hidden", cursor: "pointer", boxShadow: "0 3px 14px rgba(0,0,0,.06)" }}>
              <div style={{ position: "relative", aspectRatio: "1.3", background: t.cover ? "#000" : "", ...(t.cover ? {} : { backgroundColor: t.color || blockColor(t.id) }) }}>
                {t.cover && <img src={t.cover} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />}
                {cur && <div className="absolute" style={{ left: 9, top: 9, background: C.accentSoft, color: C.accentDeep, fontSize: 10.5, fontWeight: 700, padding: "3px 9px", borderRadius: 8 }}>当前行程</div>}
                <button onClick={(ev) => { ev.stopPropagation(); onEdit(t); }} className="absolute flex items-center justify-center rounded-full active:opacity-60" style={{ right: 8, top: 8, width: 28, height: 28, ...GLASS, background: "rgba(255,255,255,.8)", color: C.ink2 }}><Pencil size={13} /></button>
              </div>
              <div style={{ padding: "11px 12px 13px" }}>
                <div style={{ fontSize: 16, fontWeight: 700, color: C.ink, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{t.name}</div>
                <div className="flex items-center gap-1" style={{ fontSize: 11.5, color: C.sec, marginTop: 4, ...NUM }}><Calendar size={11} />{fmtRange(t.startDate, t.endDate) || "未设日期"}</div>
                <div className="flex items-center gap-1" style={{ fontSize: 11.5, color: C.sec, marginTop: 2 }}><MapPin size={11} />{n} 笔记录</div>
                <div className="flex items-center justify-between" style={{ marginTop: 7 }}>
                  <span style={{ fontSize: 18, fontWeight: 800, color: C.accent, ...NUM }}>¥{money(spend, hide)}</span>
                  <span onClick={(ev) => { ev.stopPropagation(); setHide(!hide); }} style={{ color: C.sec, display: "inline-flex" }}>{hide ? <EyeOff size={15} /> : <Eye size={15} />}</span>
                </div>
              </div>
            </div>; })}
        </div>}
    </div>
  </div>;
}

/* ═══════════ 底部 Tab ═══════════ */
function BottomTab({ tab, setTab }) {
  const items = [{ id: "list", label: "明细", Icon: Wallet }, { id: "stats", label: "统计", Icon: PieChart }, { id: "map", label: "足迹", Icon: Globe }, { id: "trips", label: "行程", Icon: Briefcase }];
  return <nav className="flex shrink-0" style={{ background: "rgba(250,246,241,.82)", ...GLASS, borderTop: `0.5px solid ${C.hair}`, paddingBottom: "env(safe-area-inset-bottom)", zIndex: 30 }}>
    {items.map((t) => { const on = tab === t.id; return <button key={t.id} onClick={() => setTab(t.id)} className="flex-1 flex flex-col items-center gap-0.5 pt-2 pb-1.5 active:opacity-50" style={{ color: on ? C.accent : C.sec, minHeight: 50 }}>
      <t.Icon size={23} strokeWidth={on ? 2.4 : 1.9} /><span style={{ fontSize: 10.5, fontWeight: on ? 700 : 500 }}>{t.label}</span></button>; })}
  </nav>;
}

/* ═══════════ 空状态 ═══════════ */
function Empty({ Icon, title, desc, action, onAction }) {
  return <div className="flex flex-col items-center text-center py-14 px-6">
    <div className="flex items-center justify-center rounded-3xl mb-3" style={{ width: 64, height: 64, background: C.card, boxShadow: "0 4px 16px rgba(0,0,0,.05)" }}><Icon size={28} color={C.accent} /></div>
    <div style={{ fontSize: 18, fontWeight: 700 }}>{title}</div>
    <div style={{ fontSize: 14, color: C.sec, marginTop: 5, maxWidth: 270, lineHeight: 1.5 }}>{desc}</div>
    {action && <button onClick={onAction} className="mt-4 px-6 py-2.5 rounded-full text-[15px] font-bold active:opacity-70" style={{ background: C.accent, color: "#fff" }}>{action}</button>}
  </div>;
}

/* ═══════════ Bottom Sheet 基座 ═══════════ */
function Sheet({ children, onClose, pad = 20 }) {
  return <div className="absolute inset-0 flex items-end justify-center" style={{ background: "rgba(0,0,0,.4)", zIndex: 50 }} onClick={onClose}>
    <div onClick={(e) => e.stopPropagation()} className="w-full overflow-y-auto" style={{ background: C.bg, borderTopLeftRadius: 26, borderTopRightRadius: 26, maxHeight: "92vh", padding: pad, paddingTop: 12, boxShadow: "0 -10px 40px rgba(0,0,0,.22)" }}>
      <div style={{ width: 38, height: 5, borderRadius: 3, background: C.ter, margin: "0 auto 16px" }} />
      {children}
      <div style={{ height: "env(safe-area-inset-bottom)" }} />
    </div>
  </div>;
}
function Field({ label, children, className = "" }) { return <div className={`mb-4 ${className}`}><div style={{ fontSize: 12.5, color: C.sec, marginBottom: 7, fontWeight: 600, paddingLeft: 2 }}>{label}</div>{children}</div>; }
const inputStyle = { background: C.card, border: `1px solid ${C.sep}`, color: C.ink, borderRadius: 16 };
function Select({ value, onChange, options }) {
  return <div className="relative">
    <select value={value} onChange={(e) => onChange(e.target.value)} className="w-full px-3.5 py-3 outline-none text-[15px] appearance-none" style={inputStyle}>{options.map((o) => <option key={o.v} value={o.v}>{o.l}</option>)}</select>
    <ChevronDown size={15} color={C.sec} style={{ position: "absolute", right: 12, top: 14, pointerEvents: "none" }} />
  </div>;
}

/* ═══════════ 记一笔 ═══════════ */
function ExpenseSheet({ init, trips, activeTripId, onClose, onSave, onDelete }) {
  const defTrip = init?.tripId || (activeTripId !== "all" ? activeTripId : "none");
  const defCur = init?.currency || trips.find((t) => t.id === defTrip)?.currency || "USD";
  const initDate = init?.expenseDate || init?.date || today();
  const isInitManual = init?.rateMode === "manual";
  const [f, setF] = useState({ id: init?.id, created: init?.createdAt ?? init?.created, expenseDate: initDate, tripId: defTrip, category: init?.category || "food", currency: defCur, localAmount: init?.localAmount != null ? String(init.localAmount) : "", note: init?.note || "", merchant: init?.merchant || "" });
  const set = (k, v) => setF((s) => ({ ...s, [k]: v }));
  const [snap, setSnap] = useState(() => init && init.rate != null ? { rate: init.rate, appliedRateDate: init.appliedRateDate || init.rateDate, status: "ready", mode: init.rateMode || "historical" } : null);
  const [loadingRate, setLoadingRate] = useState(false);
  const [manualRate, setManualRate] = useState(isInitManual ? init.rate : null);
  const [manualTouched, setManualTouched] = useState(false);
  const resolverRef = useRef(makeResolver(getRateForDate));
  const cur = curOf(f.currency);

  // 按 (币种, 消费日期) 取历史汇率；竞态守卫：仅最新一次结果被采用
  useEffect(() => {
    if (f.currency === "CNY") { setSnap({ rate: 1, appliedRateDate: f.expenseDate, status: "ready", mode: "fixed" }); setLoadingRate(false); return; }
    if (init && init.currency === f.currency && (init.expenseDate || init.date) === f.expenseDate && init.rate != null) {
      setSnap({ rate: init.rate, appliedRateDate: init.appliedRateDate || init.rateDate, status: "ready", mode: init.rateMode || "historical" }); setLoadingRate(false); return;
    }
    setLoadingRate(true); setManualTouched(false);
    const { promise } = resolverRef.current({ currency: f.currency, expenseDate: f.expenseDate });
    promise.then(({ res, current }) => { if (!current) return; setSnap(res); setLoadingRate(false); });
  }, [f.currency, f.expenseDate]);

  const amt = parseFloat(f.localAmount) || 0;
  const needManual = f.currency !== "CNY" && !loadingRate && (!snap || snap.status !== "ready");
  const usedRate = f.currency === "CNY" ? 1 : (needManual ? manualRate : snap?.rate);
  const cny = (usedRate != null && isFinite(usedRate)) ? amt * usedRate : null;

  function submit() {
    onSave({
      id: f.id, localAmount: f.localAmount, currency: f.currency, expenseDate: f.expenseDate,
      category: f.category, tripId: f.tripId, note: f.note, merchant: f.merchant,
      manualRate: needManual ? manualRate : null, manualTouched: needManual ? true : manualTouched,
    });
  }

  return <Sheet onClose={onClose}>
    <div style={{ fontSize: 22, fontWeight: 800, letterSpacing: "-0.02em", marginBottom: 18 }}>{init ? "编辑记录" : "记一笔"}</div>
    {/* 大额输入 */}
    <div className="flex items-center gap-3 mb-3 px-4 py-4 rounded-2xl" style={{ background: C.card, border: `1px solid ${C.sep}` }}>
      <div className="relative shrink-0">
        <select value={f.currency} onChange={(e) => set("currency", e.target.value)} className="appearance-none outline-none rounded-xl px-3 py-2 text-sm font-bold" style={{ background: C.fill, color: C.ink, ...NUM, paddingRight: 26 }}>{CURRENCIES.map((c) => <option key={c.code} value={c.code}>{c.flag} {c.code}</option>)}</select>
        <ChevronDown size={13} color={C.sec} style={{ position: "absolute", right: 8, top: 11, pointerEvents: "none" }} />
      </div>
      <input type="number" inputMode="decimal" value={f.localAmount} onChange={(e) => set("localAmount", e.target.value)} placeholder="0.00" autoFocus className="flex-1 bg-transparent outline-none text-right" style={{ fontSize: 30, fontWeight: 800, color: C.ink, ...NUM }} />
    </div>
    {/* 折算（按消费日期历史汇率） */}
    <div className="flex items-center justify-between px-4 py-3 rounded-2xl mb-5" style={{ background: needManual ? "#FFF1F2" : C.accentSoft }}>
      {f.currency === "CNY" ? (
        <><div><div style={{ fontSize: 12.5, color: C.accentDeep, fontWeight: 600 }}>人民币</div><div style={{ fontSize: 11, color: C.accent }}>本币无需换算</div></div>
          <span style={{ fontSize: 24, fontWeight: 800, color: C.accentDeep, ...NUM }}>¥{cny != null ? fmt(cny) : "—"}</span></>
      ) : loadingRate ? (
        <div className="flex items-center gap-2"><RefreshCw size={14} className="animate-spin" color={C.accent} /><span style={{ fontSize: 13, color: C.accentDeep }}>查询 {f.expenseDate} 的历史汇率…</span></div>
      ) : needManual ? (
        <div className="flex items-center gap-2 w-full"><AlertTriangle size={15} color={C.accent} /><span style={{ fontSize: 12.5, color: C.accentDeep }}>无 {f.expenseDate} 汇率，1 {f.currency} =</span><input type="number" inputMode="decimal" value={manualRate ?? ""} onChange={(e) => { setManualRate(parseFloat(e.target.value) || null); setManualTouched(true); }} placeholder="?" className="w-16 px-2 py-1 rounded-lg outline-none text-right" style={{ background: "#fff", ...NUM }} /><span style={{ fontSize: 13, color: C.accentDeep }}>元</span></div>
      ) : (
        <><div><div style={{ fontSize: 12.5, color: C.accentDeep, fontWeight: 600 }}>折合人民币{snap?.mode === "manual" ? "（手动）" : ""}</div>
          <div style={{ fontSize: 11, color: C.accent, ...NUM }}>1 {cur.code} = {snap?.rate ? snap.rate.toFixed(snap.rate < 0.01 ? 6 : 4) : "?"}{snap?.appliedRateDate ? " · 采用 " + snap.appliedRateDate : ""}{snap?.appliedRateDate && snap.appliedRateDate !== f.expenseDate ? "（最近有效日）" : ""}</div></div>
          <span style={{ fontSize: 24, fontWeight: 800, color: C.accentDeep, ...NUM }}>¥{cny != null ? fmt(cny) : "—"}</span></>
      )}
    </div>
    <Field label="分类"><div className="grid grid-cols-5 gap-2">{CATS.map((c) => { const on = f.category === c.id;
      return <button key={c.id} onClick={() => set("category", c.id)} className="flex flex-col items-center gap-1 py-2 rounded-xl active:opacity-70" style={{ background: on ? c.color : C.card, border: `1px solid ${on ? c.color : C.sep}` }}><c.Icon size={18} color={on ? "#fff" : c.color} strokeWidth={2.1} /><span style={{ fontSize: 10.5, fontWeight: on ? 700 : 500, color: on ? "#fff" : C.ink2 }}>{c.name}</span></button>; })}</div></Field>
    <Field label="名称 / 备注"><input value={f.note} onChange={(e) => set("note", e.target.value)} placeholder="如 蓝瓶咖啡" className="w-full px-3.5 py-3 outline-none text-[15px]" style={inputStyle} /></Field>
    <Field label="商家 / 地点（可选）"><input value={f.merchant} onChange={(e) => set("merchant", e.target.value)} placeholder="如 银座店 / 银座四丁目" className="w-full px-3.5 py-3 outline-none text-[15px]" style={inputStyle} /></Field>
    <div className="flex gap-2">
      <Field label="消费日期" className="flex-1"><input type="date" value={f.expenseDate} onChange={(e) => set("expenseDate", e.target.value)} className="w-full px-3.5 py-3 outline-none text-[15px]" style={inputStyle} /></Field>
      <Field label="行程" className="flex-1"><Select value={f.tripId} onChange={(v) => set("tripId", v)} options={[{ v: "none", l: "不归入行程" }, ...trips.map((t) => ({ v: t.id, l: t.name }))]} /></Field>
    </div>
    <div className="flex gap-2 mt-2">
      {init && <button onClick={() => onDelete(init.id)} className="px-5 py-3.5 rounded-2xl active:opacity-70" style={{ color: C.accent, background: C.card, fontWeight: 600, fontSize: 15, border: `1px solid ${C.sep}` }}>删除</button>}
      <button onClick={submit} disabled={!amt || loadingRate || (needManual && !manualRate)} className="flex-1 py-3.5 rounded-2xl active:opacity-70" style={{ background: (!amt || loadingRate || (needManual && !manualRate)) ? C.ter : C.accent, color: "#fff", fontWeight: 700, fontSize: 16 }}>{init ? "保存修改" : "保存"}</button>
    </div>
  </Sheet>;
}

/* ═══════════ 行程 Sheet ═══════════ */
function TripSheet({ init, onClose, onSave, onDelete }) {
  const [f, setF] = useState({ id: init?.id, created: init?.created, name: init?.name || "", currency: init?.currency || "USD", budgetCNY: init?.budgetCNY != null ? String(init.budgetCNY) : "", cover: init?.cover || null, color: init?.color || null, startDate: init?.startDate || "", endDate: init?.endDate || "" });
  const [busy, setBusy] = useState(false); const fileRef = useRef(null); const set = (k, v) => setF((s) => ({ ...s, [k]: v }));
  async function pickCover(file) { setBusy(true); try { const big = await fileToResized(file, 900, 0.84); set("cover", await shrinkDataUrl(big, 600, 0.74)); } catch { } setBusy(false); }
  const placeholderBg = f.color || blockColor(f.id || f.name || "new");
  return <Sheet onClose={onClose}>
    <div style={{ fontSize: 22, fontWeight: 800, letterSpacing: "-0.02em", marginBottom: 18 }}>{init ? "编辑行程" : "新建行程"}</div>
    <Field label="封面">
      <button onClick={() => fileRef.current?.click()} className="w-full active:opacity-80" style={{ position: "relative", aspectRatio: "16/7", borderRadius: 18, overflow: "hidden", ...(f.cover ? {} : { backgroundColor: placeholderBg }) }}>
        {f.cover && <img src={f.cover} alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />}
        <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,.18)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", gap: 6, fontSize: 13, fontWeight: 600 }}>{busy ? <RefreshCw size={16} className="animate-spin" /> : <ImagePlus size={16} />}{f.cover ? "更换照片封面" : "上传照片封面"}</div>
      </button>
      <input ref={fileRef} type="file" accept="image/*" hidden onChange={(e) => { if (e.target.files?.[0]) pickCover(e.target.files[0]); e.target.value = ""; }} />
      {/* 纯色封面 */}
      <div style={{ fontSize: 12, color: C.sec, margin: "12px 0 8px", paddingLeft: 2 }}>或选择纯色封面</div>
      <div className="flex items-center gap-2 flex-wrap">
        {MORANDI_SWATCHES.map((c) => { const on = !f.cover && f.color === c;
          return <button key={c} onClick={() => { set("cover", null); set("color", c); }} style={{ width: 32, height: 32, borderRadius: 10, background: c, border: on ? `2.5px solid ${C.ink}` : `1px solid rgba(0,0,0,.08)` }} />; })}
        <label className="flex items-center justify-center" style={{ width: 32, height: 32, borderRadius: 10, border: `1px dashed ${C.ter}`, position: "relative", cursor: "pointer" }}>
          <Pencil size={14} color={C.sec} />
          <input type="color" value={f.color || "#A7B0A0"} onChange={(e) => { set("cover", null); set("color", e.target.value); }} style={{ position: "absolute", inset: 0, opacity: 0, cursor: "pointer" }} />
        </label>
        {f.cover && <button onClick={() => set("cover", null)} className="text-xs px-2.5 py-1.5 rounded-lg" style={{ background: C.card, color: C.sec, border: `1px solid ${C.sep}` }}>移除照片</button>}
      </div>
    </Field>
    <Field label="行程名称"><input value={f.name} onChange={(e) => set("name", e.target.value)} placeholder="例如 东京出差" className="w-full px-3.5 py-3 outline-none text-[15px]" style={inputStyle} /></Field>
    <div className="flex gap-2">
      <Field label="开始日期" className="flex-1"><input type="date" value={f.startDate} onChange={(e) => set("startDate", e.target.value)} className="w-full px-3.5 py-3 outline-none text-[15px]" style={inputStyle} /></Field>
      <Field label="结束日期" className="flex-1"><input type="date" value={f.endDate} onChange={(e) => set("endDate", e.target.value)} className="w-full px-3.5 py-3 outline-none text-[15px]" style={inputStyle} /></Field>
    </div>
    <div className="flex gap-2">
      <Field label="默认币种" className="flex-1"><Select value={f.currency} onChange={(v) => set("currency", v)} options={CURRENCIES.map((c) => ({ v: c.code, l: `${c.flag} ${c.code} ${c.name}` }))} /></Field>
      <Field label="预算（人民币，可选）" className="flex-1"><input type="number" inputMode="decimal" value={f.budgetCNY} onChange={(e) => set("budgetCNY", e.target.value)} placeholder="不设则不限" className="w-full px-3.5 py-3 outline-none text-right text-[15px]" style={{ ...inputStyle, ...NUM }} /></Field>
    </div>
    <div className="flex gap-2 mt-2">
      {init && <button onClick={() => onDelete(init.id)} className="px-5 py-3.5 rounded-2xl active:opacity-70" style={{ color: C.accent, background: C.card, fontWeight: 600, fontSize: 15, border: `1px solid ${C.sep}` }}>删除</button>}
      <button onClick={() => onSave(f)} disabled={!f.name.trim()} className="flex-1 py-3.5 rounded-2xl active:opacity-70" style={{ background: f.name.trim() ? C.accent : C.ter, color: "#fff", fontWeight: 700, fontSize: 16 }}>{init ? "保存" : "创建"}</button>
    </div>
  </Sheet>;
}

/* ═══════════ 背景自定义（纯色 / 相册） ═══════════ */
function BackgroundSheet({ init, label, onClose, onSave }) {
  const [cover, setCover] = useState(init?.cover || null);
  const [color, setColor] = useState(init?.color || null);
  const [busy, setBusy] = useState(false);
  const fileRef = useRef(null);
  async function pick(file) { setBusy(true); try { const big = await fileToResized(file, 1100, 0.85); setCover(await shrinkDataUrl(big, 760, 0.78)); setColor(null); } catch { } setBusy(false); }
  const previewBg = cover ? {} : { backgroundColor: color || "#A9A2AE" };
  return <Sheet onClose={onClose}>
    <div style={{ fontSize: 22, fontWeight: 800, letterSpacing: "-0.02em", marginBottom: 4 }}>自定义背景</div>
    <div style={{ fontSize: 13, color: C.sec, marginBottom: 16 }}>{label} 顶部大色块 · 可选相册照片或纯色</div>
    <button onClick={() => fileRef.current?.click()} className="w-full active:opacity-80" style={{ position: "relative", aspectRatio: "16/8", borderRadius: 20, overflow: "hidden", ...previewBg }}>
      {cover && <img src={cover} alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />}
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(0,0,0,.2), rgba(0,0,0,.4))", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", gap: 6, fontSize: 14, fontWeight: 600 }}>{busy ? <RefreshCw size={16} className="animate-spin" /> : <ImagePlus size={17} />}{cover ? "更换相册照片" : "从相册添加照片"}</div>
    </button>
    <input ref={fileRef} type="file" accept="image/*" hidden onChange={(e) => { if (e.target.files?.[0]) pick(e.target.files[0]); e.target.value = ""; }} />
    <div style={{ fontSize: 12.5, color: C.sec, margin: "16px 0 9px", paddingLeft: 2 }}>或选择纯色</div>
    <div className="flex items-center gap-2 flex-wrap">
      {MORANDI_SWATCHES.map((c) => { const on = !cover && color === c;
        return <button key={c} onClick={() => { setCover(null); setColor(c); }} style={{ width: 34, height: 34, borderRadius: 11, background: c, border: on ? `2.5px solid ${C.ink}` : `1px solid rgba(0,0,0,.08)` }} />; })}
      <label className="flex items-center justify-center" style={{ width: 34, height: 34, borderRadius: 11, border: `1px dashed ${C.ter}`, position: "relative", cursor: "pointer" }}>
        <Pencil size={15} color={C.sec} />
        <input type="color" value={color || "#A9A2AE"} onChange={(e) => { setCover(null); setColor(e.target.value); }} style={{ position: "absolute", inset: 0, opacity: 0, cursor: "pointer" }} />
      </label>
    </div>
    <div className="flex gap-2 mt-6">
      <button onClick={() => onSave(null, null)} className="px-5 py-3.5 rounded-2xl active:opacity-70" style={{ color: C.ink2, background: C.card, fontWeight: 600, fontSize: 15, border: `1px solid ${C.sep}` }}>恢复默认</button>
      <button onClick={() => onSave(cover, color)} className="flex-1 py-3.5 rounded-2xl active:opacity-70" style={{ background: C.accent, color: "#fff", fontWeight: 700, fontSize: 16 }}>保存</button>
    </div>
  </Sheet>;
}

/* ═══════════ 足迹 Sheet ═══════════ */
function PlaceSheet({ init, trips, onClose, onSave, onDelete }) {
  const [f, setF] = useState({ id: init?.id, created: init?.created, name: init?.name || "", country: init?.country || "", lat: init?.lat ?? null, lng: init?.lng ?? null, date: init?.date || today(), tripId: init?.tripId || "none", note: init?.note || "", saved: init?.saved || false });
  const [photos, setPhotos] = useState(init?.photos || []);
  const [geoStatus, setGeoStatus] = useState(""); const [manual, setManual] = useState(false); const [busy, setBusy] = useState("");
  const fileRef = useRef(null); const set = (k, v) => setF((s) => ({ ...s, [k]: v }));
  useEffect(() => { if (init && !init.photos) { (async () => { const full = await store.get(pKey(init.id)); if (full) { setF((s) => ({ ...s, note: full.note || "", country: full.country || s.country })); setPhotos(full.photos || []); } })(); } }, []);
  async function doGeo() { if (!f.name.trim()) return; setGeoStatus("locating"); try { const r = await geocode(f.name.trim()); if (r) { setF((s) => ({ ...s, lat: r.lat, lng: r.lng, country: s.country || r.country })); setGeoStatus("ok"); } else { setGeoStatus("fail"); setManual(true); } } catch { setGeoStatus("fail"); setManual(true); } }
  async function addPhotos(files) { setBusy("处理照片…"); const arr = Array.from(files).slice(0, 9); const next = [...photos]; for (const file of arr) { try { next.push(await fileToResized(file)); } catch { } } setPhotos(next.slice(0, 12)); setBusy(""); }
  const hasCoord = f.lat != null && f.lng != null && !isNaN(f.lat) && !isNaN(f.lng);
  return <Sheet onClose={onClose}>
    <div style={{ fontSize: 22, fontWeight: 800, letterSpacing: "-0.02em", marginBottom: 18 }}>{init ? "编辑地点" : "添加足迹"}</div>
    <Field label="地点名称">
      <div className="flex gap-2">
        <input value={f.name} onChange={(e) => { set("name", e.target.value); setGeoStatus(""); }} placeholder="如 京都 / Santorini" autoFocus className="flex-1 px-3.5 py-3 outline-none text-[15px]" style={inputStyle} />
        <button onClick={doGeo} disabled={!f.name.trim()} className="flex items-center gap-1 px-4 rounded-2xl text-sm font-semibold active:opacity-70" style={{ background: hasCoord ? "#34C759" : C.accent, color: "#fff", opacity: f.name.trim() ? 1 : 0.4 }}>{geoStatus === "locating" ? <RefreshCw size={14} className="animate-spin" /> : hasCoord ? <Check size={15} /> : <Crosshair size={15} />}定位</button>
      </div>
      <div style={{ minHeight: 18, marginTop: 5, fontSize: 12.5 }}>
        {geoStatus === "ok" && hasCoord && <span style={{ color: "#1E9E4A" }}>已定位 · {f.country} ({f.lat.toFixed(2)}, {f.lng.toFixed(2)})</span>}
        {geoStatus === "fail" && <span style={{ color: C.accent }}>没查到，请手动填经纬度</span>}
        {hasCoord && geoStatus !== "ok" && geoStatus !== "fail" && <span style={{ color: C.sec }}>{f.country} ({f.lat.toFixed(2)}, {f.lng.toFixed(2)})</span>}
      </div>
    </Field>
    {(manual || geoStatus === "fail") && <div className="flex gap-2">
      <Field label="纬度 lat" className="flex-1"><input type="number" inputMode="decimal" value={f.lat ?? ""} onChange={(e) => set("lat", parseFloat(e.target.value))} placeholder="35.01" className="w-full px-3.5 py-3 outline-none text-[15px]" style={{ ...inputStyle, ...NUM }} /></Field>
      <Field label="经度 lng" className="flex-1"><input type="number" inputMode="decimal" value={f.lng ?? ""} onChange={(e) => set("lng", parseFloat(e.target.value))} placeholder="135.77" className="w-full px-3.5 py-3 outline-none text-[15px]" style={{ ...inputStyle, ...NUM }} /></Field>
    </div>}
    <div className="flex gap-2">
      <Field label="日期" className="flex-1"><input type="date" value={f.date} onChange={(e) => set("date", e.target.value)} className="w-full px-3.5 py-3 outline-none text-[15px]" style={inputStyle} /></Field>
      <Field label="关联行程" className="flex-1"><Select value={f.tripId} onChange={(v) => set("tripId", v)} options={[{ v: "none", l: "不关联" }, ...trips.map((t) => ({ v: t.id, l: t.name }))]} /></Field>
    </div>
    <Field label="简报 / 备注"><textarea value={f.note} onChange={(e) => set("note", e.target.value)} rows={3} placeholder="这趟在这里做了什么、印象、推荐…" className="w-full px-3.5 py-3 outline-none text-[15px]" style={{ ...inputStyle, resize: "none", lineHeight: 1.5 }} /></Field>
    <Field label={`照片${photos.length ? " · " + photos.length : ""}`}>
      <div className="grid grid-cols-4 gap-1.5">
        {photos.map((src, i) => <div key={i} className="relative" style={{ aspectRatio: "1", borderRadius: 10, overflow: "hidden", background: C.fill }}>
          <img src={src} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          {i === 0 && <span style={{ position: "absolute", left: 3, top: 3, background: "rgba(0,0,0,.5)", color: "#fff", fontSize: 9, padding: "1px 5px", borderRadius: 5 }}>封面</span>}
          <button onClick={() => setPhotos(photos.filter((_, j) => j !== i))} style={{ position: "absolute", right: 2, top: 2, width: 18, height: 18, borderRadius: 9, background: "rgba(0,0,0,.5)", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center" }}><X size={11} /></button>
        </div>)}
        {photos.length < 12 && <button onClick={() => fileRef.current?.click()} className="flex items-center justify-center active:opacity-60" style={{ aspectRatio: "1", borderRadius: 10, background: C.card, color: C.accent, border: `1px dashed ${C.ter}` }}><ImagePlus size={20} /></button>}
      </div>
      <input ref={fileRef} type="file" accept="image/*" multiple hidden onChange={(e) => { if (e.target.files?.length) addPhotos(e.target.files); e.target.value = ""; }} />
    </Field>
    <div className="flex gap-2 mt-2">
      {init && <button onClick={() => onDelete(init.id)} className="px-5 py-3.5 rounded-2xl active:opacity-70" style={{ color: C.accent, background: C.card, fontWeight: 600, fontSize: 15, border: `1px solid ${C.sep}` }}>删除</button>}
      <button onClick={() => onSave(f, photos)} disabled={!f.name.trim() || !hasCoord} className="flex-1 py-3.5 rounded-2xl active:opacity-70" style={{ background: (!f.name.trim() || !hasCoord) ? C.ter : C.accent, color: "#fff", fontWeight: 700, fontSize: 16 }}>{!hasCoord ? "请先定位" : init ? "保存" : "添加"}</button>
    </div>
    {busy && <div className="absolute left-1/2 -translate-x-1/2 px-4 py-2 rounded-full text-sm" style={{ bottom: 24, background: "rgba(17,17,19,.92)", color: "#fff", zIndex: 80 }}>{busy}</div>}
  </Sheet>;
}

/* ═══════════ 地点详情 ═══════════ */
function PlaceDetail({ meta, trips, tripSpend, onClose, onEdit, onToggleSaved }) {
  const [full, setFull] = useState(null); const [viewer, setViewer] = useState(null);
  useEffect(() => { (async () => { const f = await store.get(pKey(meta.id)); setFull(f || meta); })(); }, [meta.id]);
  const p = full || meta; const trip = trips.find((t) => t.id === p.tripId);
  return <div className="absolute inset-0 flex items-end justify-center" style={{ background: "rgba(0,0,0,.5)", zIndex: 50 }} onClick={onClose}>
    <div onClick={(e) => e.stopPropagation()} className="w-full overflow-y-auto" style={{ background: C.bg, borderTopLeftRadius: 26, borderTopRightRadius: 26, maxHeight: "94vh" }}>
      <div style={{ position: "relative", height: 280, background: p.cover ? "#000" : C.mapLand }}>
        {p.cover ? <img src={p.cover} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} /> : <div className="w-full h-full flex items-center justify-center"><MapPin size={40} color={C.ter} /></div>}
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,.62), transparent 52%)" }} />
        <button onClick={onClose} className="absolute flex items-center justify-center rounded-full active:opacity-60" style={{ right: 14, top: 14, width: 34, height: 34, ...GLASS, background: "rgba(0,0,0,.34)", color: "#fff" }}><X size={19} /></button>
        <button onClick={() => onToggleSaved(p)} className="absolute flex items-center justify-center rounded-full active:opacity-60" style={{ right: 56, top: 14, width: 34, height: 34, ...GLASS, background: "rgba(0,0,0,.34)", color: "#fff" }}><Bookmark size={17} fill={p.saved ? "#fff" : "none"} /></button>
        <div className="absolute flex items-center gap-1 px-2.5 py-1 rounded-full" style={{ left: 16, top: 16, ...GLASS, background: "rgba(255,255,255,.82)" }}><span style={{ fontSize: 13 }}>{flagFor(p.country)}</span><span style={{ fontSize: 12, fontWeight: 600, color: C.ink }}>{p.country || "—"}</span></div>
        <div style={{ position: "absolute", left: 18, bottom: 14, color: "#fff" }}>
          <div style={{ fontSize: 30, fontWeight: 800, letterSpacing: "-0.03em", textShadow: "0 2px 10px rgba(0,0,0,.4)" }}>{p.name}</div>
          <div className="flex items-center gap-1" style={{ fontSize: 13, opacity: 0.92, marginTop: 2, ...NUM }}><Calendar size={13} />{mdDate(p.date)}</div>
        </div>
      </div>
      <div style={{ padding: 18 }}>
        <div className="flex" style={{ background: C.card, borderRadius: 18, boxShadow: "0 2px 10px rgba(0,0,0,.04)", marginBottom: 16 }}>
          <Cell label="日期" value={mdDate(p.date)} />
          <Div /><Cell label="行程花费" value={trip ? "¥" + fmt(tripSpend(trip.id), 0) : "—"} accent />
          <Div /><Cell label="照片" value={(p.photos?.length || 0) + " 张"} />
        </div>
        {trip && <div className="inline-flex items-center gap-1.5 mb-4 px-3 py-1.5 rounded-full" style={{ background: C.accentSoft, color: C.accentDeep, fontSize: 13, fontWeight: 600 }}><Briefcase size={13} />{trip.name}</div>}
        {p.note && <div className="mb-4 p-4 rounded-2xl" style={{ background: C.card, boxShadow: "0 2px 10px rgba(0,0,0,.04)" }}>
          <div style={{ fontSize: 12.5, color: C.sec, fontWeight: 600, marginBottom: 6 }}>简报</div>
          <div style={{ fontSize: 15, color: C.ink2, lineHeight: 1.6, whiteSpace: "pre-wrap" }}>{p.note}</div>
        </div>}
        {p.photos && p.photos.length > 0 && <div className="mb-4">
          <div style={{ fontSize: 12.5, color: C.sec, fontWeight: 600, padding: "0 2px 8px" }}>照片 · {p.photos.length}</div>
          <div className="grid grid-cols-3 gap-1.5">{p.photos.map((src, i) => <button key={i} onClick={() => setViewer(src)} className="active:opacity-80" style={{ aspectRatio: "1", borderRadius: 12, overflow: "hidden", background: C.fill }}><img src={src} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} /></button>)}</div>
        </div>}
        <button onClick={() => onEdit(p)} className="w-full py-3.5 rounded-2xl text-[15px] font-bold active:opacity-70" style={{ background: C.card, color: C.accent, boxShadow: "0 2px 10px rgba(0,0,0,.04)" }}>编辑这个地点</button>
        <div style={{ height: "env(safe-area-inset-bottom)" }} />
      </div>
    </div>
    {viewer && <div className="absolute inset-0 flex items-center justify-center p-4" style={{ background: "rgba(0,0,0,.92)", zIndex: 80 }} onClick={() => setViewer(null)}><img src={viewer} alt="" style={{ maxWidth: "100%", maxHeight: "100%", borderRadius: 8 }} /></div>}
  </div>;
}
function Cell({ label, value, accent }) { return <div className="flex-1 text-center" style={{ padding: "13px 6px" }}><div style={{ fontSize: 17, fontWeight: 700, color: accent ? C.accent : C.ink, ...NUM }}>{value}</div><div style={{ fontSize: 11.5, color: C.sec, marginTop: 1 }}>{label}</div></div>; }
function Div() { return <div style={{ width: 1, background: C.sep, margin: "12px 0" }} />; }

/* ═══════════ 操作菜单 ═══════════ */
function ActionMenu({ onClose, onExport, onRefresh, onBackfill, pendingCount = 0 }) {
  return <Sheet onClose={onClose} pad={16}>
    <div className="flex flex-col gap-1">
      {pendingCount > 0 && <MenuItem icon={<AlertTriangle size={19} color={C.accent} />} label={`补齐待补录汇率（${pendingCount} 笔）`} onClick={onBackfill} />}
      <MenuItem icon={<RefreshCw size={19} />} label="刷新实时汇率（仅预览）" onClick={onRefresh} />
      <MenuItem icon={<Download size={19} />} label="导出 CSV（报销用）" onClick={onExport} />
    </div>
    <button onClick={onClose} className="w-full mt-2 py-3.5 rounded-2xl text-[15px] font-semibold active:opacity-70" style={{ background: C.card, color: C.ink2 }}>取消</button>
  </Sheet>;
}
function MenuItem({ icon, label, onClick }) {
  return <button onClick={onClick} className="flex items-center gap-3 px-4 py-3.5 rounded-2xl active:opacity-60" style={{ background: C.card, color: C.ink }}>
    <span style={{ color: C.accent }}>{icon}</span><span style={{ fontSize: 15.5, fontWeight: 500 }}>{label}</span>
  </button>;
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
