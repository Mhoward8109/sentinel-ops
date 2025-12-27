// js/core/storage.js
import { SCHEMA_VERSION, validateSchema } from "./schema.js";

const STORAGE_KEY = "sentinel_ops_data";

export function saveAllData(data) {
  const payload = {
    schemaVersion: SCHEMA_VERSION,
    data
  };

  localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
}

export function loadAllData() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return null;

  let parsed;
  try {
    parsed = JSON.parse(raw);
  } catch {
    throw new Error("Corrupt storage: invalid JSON");
  }

  if (parsed.schemaVersion !== SCHEMA_VERSION) {
    throw new Error(
      `Schema mismatch. Expected ${SCHEMA_VERSION}, found ${parsed.schemaVersion}`
    );
  }

  return parsed.data;
}

export function getAllData() {
  const data = loadAllData();
  return data ?? {};
}

export function clearAllData() {
  localStorage.removeItem(STORAGE_KEY);
}

export function replaceAllData(data) {
  validateSchema(data);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}
