import { execFileSync } from "node:child_process";
import { existsSync, readFileSync, writeFileSync } from "node:fs";

const status = execFileSync("supabase", ["status", "-o", "env"], {
  encoding: "utf8",
});

const values = Object.fromEntries(
  status
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line && !line.startsWith("#") && line.includes("="))
    .map((line) => {
      const separator = line.indexOf("=");
      const key = line.slice(0, separator);
      const raw = line.slice(separator + 1);
      const value = raw.replace(/^["']|["']$/g, "");
      return [key, value];
    }),
);

const url = values.API_URL ?? values.SUPABASE_URL;
const key = values.PUBLISHABLE_KEY ?? values.ANON_KEY;

if (!url || !key) {
  throw new Error(
    "Could not read API_URL / PUBLISHABLE_KEY from `supabase status -o env`.",
  );
}

const envPath = ".env.local";
const existing = existsSync(envPath) ? readFileSync(envPath, "utf8") : "";
const header = "# Local Supabase. Written by pnpm supabase:start. Do not commit.\n";
let next = existing.trim().length > 0 ? existing : header;

function upsert(content, name, value) {
  const line = `${name}=${value}`;
  const pattern = new RegExp(`^${name}=.*$`, "m");

  if (pattern.test(content)) {
    return content.replace(pattern, line);
  }

  const suffix = content.endsWith("\n") ? "" : "\n";
  return `${content}${suffix}${line}\n`;
}

next = upsert(next, "SUPABASE_URL", url);
next = upsert(next, "SUPABASE_PUBLISHABLE_KEY", key);

if (!next.endsWith("\n")) {
  next += "\n";
}

writeFileSync(envPath, next);
process.stdout.write(`Wrote local Supabase keys to ${envPath}\n`);
