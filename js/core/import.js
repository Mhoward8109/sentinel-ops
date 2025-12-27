function importBackupFile(text) {
  let data;

  // 1. Parse
  try {
    data = JSON.parse(text);
  } catch {
    throw new Error("Invalid JSON backup file");
  }

  // 2. One-time schema upgrade for legacy backups
  if (!data.schemaVersion) {
    data.schemaVersion = 1;
  }

  // 3. Validate (hard enforcement)
  validateSchema(data);

  // 4. Backup-before-destroy (must NOT block import)
  try {
    exportBackup();
  } catch (err) {
    console.error("Backup failed, continuing import", err);
  }

  // 5. Replace data via storage ONLY
  replaceAllData(data);
}
