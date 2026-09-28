export const readIntent = `
type Intent = "stop" | "answer" | "add" | "other" | "ask";

function readIntent(message: string, hasFile: boolean): Intent {
  const text = message.trim();

  if (declines(text)) return "stop";
  if (asksAQuestion(text)) return "answer";
  if (asksToAddCompanies(text)) return "add";
  if (asksForAnotherJob(text)) return "other";

  return hasFile ? "ask" : "other";
}
`;

export const stageFrom = `
type Stage = "read" | "domains" | "preview" | "wait" | "write";

function stageFrom(done: ReadonlySet<string>): Stage {
  if (!done.has("sheet")) return "read";
  if (!done.has("domains")) return "domains";
  if (!done.has("preview")) return "preview";
  if (!done.has("approved")) return "wait";
  return "write";
}
`;

export const kindOfFile = `
type FileKind = "clean" | "messy" | "names";

function kindOfFile(cells: string[]): FileKind {
  const filled = cells.map((cell) => cell.trim()).filter(Boolean);
  const hosts = filled.filter(isHost);
  const filledRatio = cells.length === 0 ? 0 : filled.length / cells.length;
  const hostRatio = filled.length === 0 ? 0 : hosts.length / filled.length;

  if (filledRatio >= 0.8 && hostRatio >= 0.8) return "clean";
  if (hosts.length > 0) return "messy";
  return "names";
}
`;

export const kindForTurn = `
function kindForTurn(files: FileKind[]): FileKind {
  if (files.includes("messy")) return "messy";
  if (files.includes("clean")) return "clean";
  return "names";
}
`;

export const domainForRow = `
function companyDomain(email: string): string | null {
  const host = email.split("@")[1]?.toLowerCase();
  if (!host || isPersonalInbox(host)) return null;
  return registrableDomain(host);
}

function domainForRow(row: Row, kind: FileKind): string | null {
  const fromFile =
    domainFromWebsite(row.website) ??
    companyDomain(row.email) ??
    domainInText(row.text);

  if (fromFile) return fromFile;
  if (kind === "clean") return null;

  return domainFromCrm(row.name) ?? domainFromWeb(row.name);
}
`;

export const keepUnique = `
function keepUnique(rows: Company[]): Company[] {
  const seen = new Set<string>();

  return rows.filter((row) => {
    const key = row.domain || row.name;
    if (!key || seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}
`;

export const onApprove = `
async function onApprove(fileId: string, selectedIds: string[]) {
  const key = stableKey(fileId, selectedIds);
  const live = await findLiveJob(key);
  if (live) return live;

  return enqueue(key);
}
`;

export const writeJob = `
function batchSize(rowCount: number): number {
  if (rowCount <= 50) return rowCount;
  if (rowCount <= 200) return 50;
  return 100;
}

async function writeJob(rows: Row[]) {
  const size = batchSize(rows.length);

  if (rows.length > 500) {
    for (let start = 0; start < rows.length; start += size) {
      await sendBatch({ start, size });
    }
    return;
  }

  for (let start = 0; start < rows.length; start += size) {
    await writeWindow(rows.slice(start, start + size));
  }
}
`;

export const writeWindow = `
async function writeWindow(rows: Row[]) {
  if (rows.length === 0) {
    return { created: 0, skipped: 0, failed: 1 };
  }

  let created = 0;
  let skipped = 0;
  let failed = 0;

  for (const row of rows) {
    const domain = readDomain(row.cell);
    if (!domain) {
      failed += 1;
      continue;
    }

    try {
      const outcome = await createCompany(domain);
      if (outcome === "skipped") skipped += 1;
      else created += 1;
    } catch (error) {
      failed += 1;
      if (isTemporary(error)) throw error;
    }
  }

  return { created, skipped, failed };
}
`;
