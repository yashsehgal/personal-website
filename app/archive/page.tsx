import { ARCHIVE_LINKS } from "@/common/archive";

export default function Archive() {
  return (
    <div className="flex w-full min-w-0 flex-col items-start gap-6 px-1 wide:mt-16">
      <h1 className="font-medium tracking-tight">Archive</h1>
      <ul className="-mx-1 flex w-[calc(100%+0.5rem)] min-w-0 flex-col">
        {ARCHIVE_LINKS.map((archiveLink, index) => {
          const showYear =
            index === 0 || ARCHIVE_LINKS[index - 1].year !== archiveLink.year;

          return (
            <li key={archiveLink.id}>
              <a
                href={archiveLink.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-baseline justify-between gap-6 rounded px-1 py-0.5 text-sm tracking-tight text-muted-foreground hover:bg-muted hover:text-foreground focus-visible:bg-muted focus-visible:text-foreground"
              >
                <span className="min-w-0">
                  <span
                    className={showYear ? "tabular-nums" : "invisible tabular-nums"}
                    aria-hidden={showYear ? undefined : true}
                  >
                    {archiveLink.year}
                  </span>
                  <span
                    aria-hidden="true"
                    className={showYear ? undefined : "invisible"}
                  >
                    {" / "}
                  </span>
                  <span className="text-foreground">{archiveLink.title}</span>
                </span>
                <span className="shrink-0">{archiveLink.type}</span>
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
