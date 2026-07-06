// models/backup.mjs —— 完整备份/恢复纯逻辑（构建、校验、按 id 合并）
export const BACKUP_TYPE = "travel-ledger-backup";
export const BACKUP_VERSION = 1;

export function buildBackup({ expenses, trips, places, settings, schemaVersion }) {
  return {
    app: "旅行账本",
    type: BACKUP_TYPE,
    backupVersion: BACKUP_VERSION,
    schemaVersion: schemaVersion ?? 2,
    exportedAt: Date.now(),
    expenses: expenses || [],
    trips: trips || [],
    places: places || [],
    settings: settings || {},
  };
}

export function validateBackup(o) {
  if (!o || typeof o !== "object" || Array.isArray(o)) return { ok: false, reason: "不是有效的备份对象" };
  if (o.type !== BACKUP_TYPE && o.app !== "旅行账本") return { ok: false, reason: "不是旅行账本的备份文件" };
  for (const k of ["expenses", "trips", "places"]) {
    if (o[k] != null && !Array.isArray(o[k])) return { ok: false, reason: `${k} 字段格式错误` };
  }
  if (o.settings != null && (typeof o.settings !== "object" || Array.isArray(o.settings))) return { ok: false, reason: "settings 字段格式错误" };
  return { ok: true };
}

// 合并：只添加本机没有的 id；本机已有的记录一律保留原样（绝不被备份覆盖）
export function mergeById(existing, imported) {
  const base = Array.isArray(existing) ? existing : [];
  const ids = new Set(base.map((x) => x && x.id).filter(Boolean));
  const added = (Array.isArray(imported) ? imported : []).filter((x) => x && x.id && !ids.has(x.id));
  return { list: [...base, ...added], added: added.length, skipped: (Array.isArray(imported) ? imported.length : 0) - added.length };
}
