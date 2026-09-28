import { ArrowRight } from "lucide-react";

const kicker =
  "text-[10px] tracking-[0.14em] text-muted-foreground uppercase";

const value =
  "rounded-sm border border-border bg-muted px-2.5 py-1.5 font-mono text-xs leading-5 tracking-tight text-foreground";

const quiet =
  "rounded-sm border border-border px-2.5 py-1.5 font-mono text-xs leading-5 tracking-tight text-muted-foreground";

function Arrow() {
  return (
    <ArrowRight
      aria-hidden="true"
      strokeWidth={1.5}
      className="size-4 shrink-0 text-foreground/40"
    />
  );
}

function Down() {
  return <span aria-hidden="true" className="h-4 w-px bg-foreground/30" />;
}

export function SheetMap() {
  const rows = [
    { cell: "acme.com", company: "Acme", out: false },
    { cell: "jane@northwind.io", company: "Northwind", out: false },
    { cell: "contoso.com/about", company: "Contoso", out: false },
    { cell: "sam@gmail.com", company: "Stays out", out: true },
  ];

  return (
    <div
      role="img"
      aria-label="Four file cells map to companies. acme.com, jane@northwind.io, and contoso.com/about become companies. sam@gmail.com stays out."
      className="mx-auto grid w-max grid-cols-[auto_auto_auto] items-center gap-x-4 gap-y-2"
    >
      <p className={kicker}>Cell</p>
      <span />
      <p className={kicker}>Company</p>
      {rows.map((row) => (
        <div key={row.cell} className="contents">
          <div className={row.out ? quiet : value}>{row.cell}</div>
          {row.out ? <span /> : <Arrow />}
          <div className={row.out ? quiet : value}>{row.company}</div>
        </div>
      ))}
    </div>
  );
}

const pipeline = [
  { file: "acme.com", domain: "acme.com", company: "Acme", out: false },
  { file: "jane@northwind.io", domain: "northwind.io", company: "Northwind", out: false },
  { file: "contoso.com/about", domain: "contoso.com", company: "Contoso", out: false },
  { file: "sam@gmail.com", domain: "Stays out", company: "", out: true },
];

export function DomainPipeline() {
  return (
    <div
      role="img"
      aria-label="A file of four cells. Three domains are kept and added to the CRM. sam@gmail.com stays out."
      className="mx-auto grid w-max grid-cols-[auto_auto_auto_auto_auto] items-center gap-x-3 gap-y-2"
    >
      <p className={kicker}>The file</p>
      <span />
      <p className={kicker}>Domain</p>
      <span />
      <p className={kicker}>CRM</p>
      {pipeline.map((row) => (
        <div key={row.file} className="contents">
          <div className={row.out ? quiet : value}>{row.file}</div>
          {row.out ? <span /> : <Arrow />}
          <div className={row.out ? quiet : value}>{row.domain}</div>
          {row.out ? <span /> : <Arrow />}
          {row.out ? <span /> : <div className={value}>{row.company}</div>}
        </div>
      ))}
    </div>
  );
}

const checks = [
  { rule: "Don't add", verdict: "No" },
  { rule: "A question", verdict: "No" },
  { rule: "Add companies", verdict: "Yes — start" },
  { rule: "Some other job", verdict: "Not checked" },
  { rule: "You didn't say", verdict: "Not checked" },
];

export function MessageOrder() {
  return (
    <div
      role="img"
      aria-label="The sentence add these companies misses don't-add and a question, then matches add companies. Later checks are not read."
      className="mx-auto flex w-max flex-col gap-4"
    >
      <p className="text-center font-mono text-xs tracking-tight text-foreground">
        add these companies
      </p>
      <ol className="flex flex-col gap-2">
        {checks.map((check, index) => {
          const hit = index === 2;
          const unread = index > 2;
          return (
            <li key={check.rule} className="grid grid-cols-[1.5rem_9rem_auto] items-center gap-3">
              <span className="text-xs text-muted-foreground">{index + 1}</span>
              <span
                className={
                  hit
                    ? value
                    : unread
                      ? quiet
                      : "px-2.5 py-1.5 text-xs tracking-tight text-foreground"
                }
              >
                {check.rule}
              </span>
              <span
                className={`text-xs tracking-tight ${hit ? "text-foreground" : "text-muted-foreground"}`}
              >
                {check.verdict}
              </span>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

const kinds = [
  {
    title: "Clean list",
    rows: ["acme.com", "northwind.io", "contoso.com"],
  },
  {
    title: "Messy text",
    rows: ["Call jane@northwind.io", "re: the Acme deal", "contoso.com/about"],
  },
  {
    title: "Names only",
    rows: ["Acme", "Northwind", "Contoso"],
  },
];

export function FileKindTables() {
  return (
    <div
      role="img"
      aria-label="Three files. A clean list is hosts. Messy text buries hosts in notes. Names only has company names."
      className="mx-auto flex w-max items-start justify-center gap-10"
    >
      {kinds.map((kind) => (
        <div key={kind.title} className="flex flex-col gap-2">
          <p className={kicker}>{kind.title}</p>
          {kind.rows.map((row) => (
            <div key={row} className={value}>
              {row}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export function FileKindWinner() {
  const cases = [
    { files: ["Messy notes", "Clean list"], winner: "Messy" },
    { files: ["Clean list", "Names only"], winner: "Clean list" },
  ];

  return (
    <div
      role="img"
      aria-label="A messy file wins over a clean list. A clean list wins over names only."
      className="mx-auto flex w-max flex-col gap-4"
    >
      {cases.map((item) => (
        <div key={item.winner} className="flex items-center gap-3">
          {item.files.map((file) => (
            <div key={file} className={value}>
              {file}
            </div>
          ))}
          <Arrow />
          <div className={value}>{item.winner}</div>
        </div>
      ))}
    </div>
  );
}

const sources = [
  { cell: "acme.com", source: "Website cell", domain: "acme.com" },
  { cell: "jane@northwind.io", source: "Work email", domain: "northwind.io" },
  { cell: "see contoso.com/about", source: "Text in the file", domain: "contoso.com" },
  { cell: "Acme", source: "The CRM", domain: "acme.com" },
  { cell: "nothing in the file", source: "The web", domain: "a guess" },
];

export function DomainSources() {
  return (
    <div className="mx-auto flex w-full max-w-lg flex-col gap-3">
      <table className="w-full border-collapse text-left text-xs">
        <caption className="sr-only">
          Each row uses the first source that can name a domain. A clean list never reaches the web.
        </caption>
        <thead>
          <tr className={kicker}>
            <th className="border-b border-border px-3 py-2 font-normal">Cell</th>
            <th className="border-b border-border px-3 py-2 font-normal">First source</th>
            <th className="border-b border-border px-3 py-2 font-normal">Domain</th>
          </tr>
        </thead>
        <tbody>
          {sources.map((row) => (
            <tr key={row.cell}>
              <td className="border-b border-border px-3 py-2 font-mono tracking-tight text-foreground">
                {row.cell}
              </td>
              <td className="border-b border-border px-3 py-2 tracking-tight text-foreground">
                {row.source}
              </td>
              <td className="border-b border-border px-3 py-2 font-mono tracking-tight text-foreground">
                {row.domain}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="text-center text-xs tracking-tight text-muted-foreground">
        A clean list stops at the file. It never reaches the web.
      </p>
    </div>
  );
}

export function DuplicateMerge() {
  return (
    <table
      className="mx-auto border-separate border-spacing-x-4 border-spacing-y-2 text-left"
      aria-label="Two acme.com cells become one Acme. northwind.io becomes Northwind. sam@gmail.com stays out."
    >
      <thead>
        <tr className={kicker}>
          <th className="px-2.5 pb-1 text-left font-normal">Cell</th>
          <th />
          <th className="px-2.5 pb-1 text-left font-normal">Company</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className={value}>acme.com</td>
          <td rowSpan={2} className="text-center align-middle text-foreground/40">
            →
          </td>
          <td rowSpan={2} className="align-middle">
            <div className={value}>Acme</div>
          </td>
        </tr>
        <tr>
          <td className={value}>acme.com</td>
        </tr>
        <tr>
          <td className={value}>northwind.io</td>
          <td className="text-center text-foreground/40">→</td>
          <td className={value}>Northwind</td>
        </tr>
        <tr>
          <td className={quiet}>sam@gmail.com</td>
          <td />
          <td className={quiet}>Stays out</td>
        </tr>
      </tbody>
    </table>
  );
}

function BatchField({ columns, rows }: { columns: number; rows: number }) {
  return (
    <div
      className="grid gap-1"
      style={{ gridTemplateColumns: `repeat(${columns}, 14px)` }}
    >
      {Array.from({ length: columns * rows }, (_, index) => (
        <span key={index} className="h-3.5 rounded-xs border border-border bg-muted" />
      ))}
    </div>
  );
}

export function BatchScale() {
  return (
    <div
      role="img"
      aria-label="Three rows are one batch. Fifty thousand rows become about 500 batches on one queue. A hundred thousand rows become about 1,000 batches, twice as wide, on the same queue."
      className="mx-auto flex w-max flex-col gap-8"
    >
      <div className="flex items-center gap-6">
        <p className="w-28 text-xs tracking-tight text-foreground">3 rows</p>
        <div className="flex flex-col gap-2">
          <div className={`${value} w-fit`}>1 batch</div>
          <p className="text-[11px] tracking-tight text-muted-foreground">The file is the batch.</p>
        </div>
      </div>
      <div className="flex items-center gap-6">
        <p className="w-28 text-xs tracking-tight text-foreground">50,000 rows</p>
        <div className="flex w-max flex-col gap-2">
          <BatchField columns={8} rows={3} />
          <div className="rounded-sm border border-border bg-muted px-3 py-1.5 text-center text-[10px] tracking-[0.14em] text-foreground uppercase">
            One queue
          </div>
          <p className="text-center text-[11px] tracking-tight text-muted-foreground">
            about 500 batches
          </p>
        </div>
      </div>
      <div className="flex items-center gap-6">
        <p className="w-28 text-xs tracking-tight text-foreground">100,000 rows</p>
        <div className="flex w-max flex-col gap-2">
          <BatchField columns={16} rows={3} />
          <div className="rounded-sm border border-border bg-muted px-3 py-1.5 text-center text-[10px] tracking-[0.14em] text-foreground uppercase">
            One queue
          </div>
          <p className="text-center text-[11px] tracking-tight text-muted-foreground">
            about 1,000 batches
          </p>
        </div>
      </div>
    </div>
  );
}

export function WorkerLoop() {
  const steps = ["Count the rows", "Pick a batch size", "Write that window"];

  return (
    <div
      role="img"
      aria-label="The worker counts the rows, picks a batch size, and writes that window. If rows remain, it writes the next window. If none remain, it is done."
      className="mx-auto flex w-max flex-col items-center gap-2"
    >
      {steps.map((step) => (
        <div key={step} className="flex flex-col items-center gap-2">
          <div className="rounded-sm border border-border bg-muted px-3 py-2 text-xs tracking-tight text-foreground">
            {step}
          </div>
          <Down />
        </div>
      ))}
      <div className="flex items-center gap-3">
        <div className={value}>More rows — write the next window</div>
        <div className={quiet}>No more rows — done</div>
      </div>
    </div>
  );
}

const batchRows = [
  { cell: "acme.com", result: "Created" },
  { cell: "northwind.io", result: "Created" },
  { cell: "not a host", result: "Failed" },
  { cell: "contoso.com", result: "Created" },
];

export function BadCell() {
  return (
    <div
      role="img"
      aria-label="One batch of four cells. Three are created. One fails. The batch continues."
      className="mx-auto flex w-max flex-col gap-3"
    >
      <p className={kicker}>One batch</p>
      <table className="border-collapse text-left text-xs">
        <tbody>
          {batchRows.map((row) => (
            <tr key={row.cell}>
              <td
                className={`border-b border-border px-3 py-2 font-mono tracking-tight ${row.result === "Failed" ? "text-muted-foreground" : "text-foreground"}`}
              >
                {row.cell}
              </td>
              <td
                className={`border-b border-border px-3 py-2 tracking-tight ${row.result === "Failed" ? "text-muted-foreground" : "text-foreground"}`}
              >
                {row.result}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="text-xs tracking-tight text-muted-foreground">Created 3 · Failed 1</p>
    </div>
  );
}
