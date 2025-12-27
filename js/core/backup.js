// js/core/backup.js
import { getAllData } from "./storage.js";

export function exportBackup() {
  const data = getAllData();

  const blob = new Blob(
    [JSON.stringify(data, null, 2)],
    { type: "application/json" }
  );

  const ts = new Date().toISOString().replace(/[:.]/g, "-");
  const filename = `sentinel-backup-${ts}.json`;

  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = filename;
  a.click();

  URL.revokeObjectURL(a.href);
}
