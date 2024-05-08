export interface Backups {
  data: string[];
  lastBackUp: Date | null;
  nextBackUp: Date | null;
}

export const initBackups = (): Backups => ({
  data: [],
  lastBackUp: null,
  nextBackUp: null,
});
