import { WRITINGS } from "@/common/writings";
import Link from "next/link";

export default function Writings() {
  return (
    <div className="flex w-full min-w-0 flex-col items-start gap-6 px-1">
      <h1 className="font-medium tracking-tight">Writings</h1>
      <ul className="-mx-1 flex w-[calc(100%+0.5rem)] min-w-0 flex-col">
        {WRITINGS.map((writing, index) => {
          const showYear =
            index === 0 || WRITINGS[index - 1].year !== writing.year;

          return (
            <li key={writing.id}>
              <Link
                href={writing.href}
                className="flex items-baseline justify-between gap-6 rounded px-1 py-0.5 text-sm tracking-tight text-muted-foreground hover:bg-muted hover:text-foreground focus-visible:bg-muted focus-visible:text-foreground"
              >
                <span className="min-w-0">
                  <span
                    className={
                      showYear ? "tabular-nums" : "invisible tabular-nums"
                    }
                    aria-hidden={showYear ? undefined : true}
                  >
                    {writing.year}
                  </span>
                  <span
                    aria-hidden="true"
                    className={showYear ? undefined : "invisible"}
                  >
                    {" / "}
                  </span>
                  <span className="text-foreground">{writing.title}</span>
                </span>
                <span className="shrink-0">{writing.type}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
