import { ArticleTitle } from "@/components/article-title";
import { CodeSample } from "@/components/code-sample";
import { EssayFigure, EssayFlow } from "@/components/essay-diagram";
import {
  BadCell,
  BatchScale,
  DomainPipeline,
  DomainSources,
  DuplicateMerge,
  FileKindTables,
  FileKindWinner,
  MessageOrder,
  SheetMap,
  WorkerLoop,
} from "@/components/spreadsheet-figures";
import {
  domainForRow,
  keepUnique,
  kindForTurn,
  kindOfFile,
  onApprove,
  readIntent,
  stageFrom,
  writeJob,
  writeWindow,
} from "./snippets";

const copyClassName =
  "text-pretty leading-relaxed text-muted-foreground";

const headingClassName = "text-pretty font-medium tracking-tight text-foreground";

const ARTICLE_LINKS = [
  {
    href: "https://aws.amazon.com/what-is/batch-processing/",
    description:
      "A large file is cut into batches and those batches run on a queue, so the write does not have to finish the whole sheet at once.",
  },
  {
    href: "https://sheetjs.com/",
    description:
      "The spreadsheet is read into rows first, so a domain, an email, or a note can be taken from the cells before anything is written.",
  },
] as const;

export default function AddingCompaniesFromASpreadsheetPage() {
  return (
    <div className="mx-auto flex w-full min-w-0 max-w-3xl flex-col items-start gap-10 px-1 wide:mt-16">
      <ArticleTitle title="Bulk CSV Handling" />
      <article className="flex w-full min-w-0 flex-col gap-12">
        <section className="flex flex-col gap-6">
          <h2 className={headingClassName}>The job</h2>
          <p className={copyClassName}>
            I built this in the chat at Octolane. Someone drops a spreadsheet
            and wants those companies in the CRM.
          </p>
          <p className={copyClassName}>
            The file might be a column of domains. It might be a column of work
            emails. It might be a mess of both, buried in notes. Three rows and
            a hundred thousand rows take the same path.
          </p>
          <EssayFigure
            n={1}
            caption="Four cells from a file. Three become companies. A personal inbox stays out."
          >
            <SheetMap />
          </EssayFigure>
          <p className={copyClassName}>
            Read it like mail. The company is the address on the envelope.
            acme.com is already an address. jane@northwind.io carries the
            company in the email. A link such as contoso.com/about is the same
            company, with a page attached. sam@gmail.com is a person, so it
            stays in the pile.
          </p>
        </section>

        <section className="flex flex-col gap-6">
          <h2 className={headingClassName}>What went wrong</h2>
          <p className={copyClassName}>
            At first the model did the reading and the writing. It searched the
            web for companies whose domains were already in the file. It asked
            the person to type domains by hand. Then it tried again. A large
            file died when the reply ran out of room.
          </p>
          <p className={copyClassName}>
            The model still chooses the step. Ordinary code reads the file and
            writes the rows. That code does the same thing every time, whether
            the file has three rows or a hundred thousand.
          </p>
        </section>

        <section className="flex flex-col gap-6">
          <h2 className={headingClassName}>What you see</h2>
          <p className={copyClassName}>
            A batch is a group of rows we write together. Skip means the
            company was already in the CRM, so we leave the existing record
            alone.
          </p>
          <EssayFlow
            n={2}
            caption="The path from a file to companies in the CRM."
            steps={["File", "Read the rows", "Preview", "Approve", "Write", "Done"]}
          />
          <p className={copyClassName}>
            The file lands in the thread. If the message clearly asks to add
            companies, we start reading. If the message is only “here’s the
            list,” we ask one question. If the person asked for something else,
            a summary, an email, or deals, this flow stays out of the way.
          </p>
          <EssayFigure
            n={3}
            caption="Read the file, take the domains, then add them to the CRM."
          >
            <DomainPipeline />
          </EssayFigure>
          <p className={copyClassName}>
            While the file is read, the card says “Parsing accounts from your
            file,” then “Checking which companies are already in your CRM.” A
            live line shows “Reading 1,200 of 10,000 rows.”
          </p>
          <p className={copyClassName}>
            Ten or fewer new companies stay as a list in the thread. Each row
            can be checked or unchecked. Eleven or more become a compact card:
            a few logos, a chip such as “10K more,” and a count of rows, unique
            companies, and companies already in the CRM. Opening that card uses
            the side panel. The message itself does not grow a scrollbar.
          </p>
          <p className={copyClassName}>
            Approve is the yes. Dismiss leaves the card closed. After approval
            the card shows created, skipped, and failed. Stop pauses the next
            batch. The batch already sent still finishes. If the model’s
            sentence never arrives, the card still says what happened.
          </p>
        </section>

        <section className="flex flex-col gap-6">
          <h2 className={headingClassName}>What the message means</h2>
          <p className={copyClassName}>
            We read the message in a fixed order. The first match wins.
          </p>
          <EssayFigure
            n={4}
            caption="We check the message from the top. The first match wins."
          >
            <MessageOrder />
          </EssayFigure>
          <p className={copyClassName}>
            “Don’t add these” stops the flow, even though the sentence also
            contains “add.” A question such as “how many companies are in
            here?” is a read, so we answer it. “Add these companies,” “import
            this list,” and “add the rest” start the flow. Drafting an email or
            making deals is a different job, and that job keeps its own path.
            Anything else said next to a fresh spreadsheet counts as unsaid, so
            we ask once.
          </p>
          <CodeSample code={readIntent} />
        </section>

        <section className="flex flex-col gap-6">
          <h2 className={headingClassName}>Where the chat is</h2>
          <p className={copyClassName}>
            The stage comes from what has already happened in the conversation.
            A flag set at the start of the turn goes stale as soon as the chat
            takes an unexpected step.
          </p>
          <EssayFlow
            n={5}
            caption="Where the chat is, from the sheet to the write."
            steps={["Read the sheet", "Find domains", "Show the card", "Wait", "Write"]}
          />
          <p className={copyClassName}>
            First we read the sheet. Then we find the domains. Then we show the
            card and wait. We write only after approval. While one of these
            steps owns the turn, the model is given that step. Web search, a
            freeform question, and a one-off create stay off the table, so the
            model cannot wander into them.
          </p>
          <CodeSample code={stageFrom} />
        </section>

        <section className="flex flex-col gap-6">
          <h2 className={headingClassName}>What kind of file</h2>
          <p className={copyClassName}>
            Before we look anything up, we decide what kind of file this is.
          </p>
          <EssayFigure
            n={6}
            caption="A clean list is hosts down the page. Messy text buries them. Names only has no hosts."
          >
            <FileKindTables />
          </EssayFigure>
          <p className={copyClassName}>
            A clean list has a domain or website column, or no header at all,
            just domains down the page. That column is at least about 80%
            filled, and about 80% of the filled cells are real hosts. If the
            header row itself looks like a list of domains, we treat it as
            data.
          </p>
          <p className={copyClassName}>
            Messy text still contains hosts, but they sit in notes, in mixed
            email cells, or under a title row. Names only means company names
            and no hosts. That path is the last resort.
          </p>
          <p className={copyClassName}>
            A “clean” read that finds zero domains is a misread. If any token
            looks like a host, we treat the file as messy text. Otherwise we
            treat it as names only.
          </p>
          <CodeSample code={kindOfFile} />
          <EssayFigure
            n={7}
            caption="One messy file decides the turn. A clean list wins over names only."
          >
            <FileKindWinner />
          </EssayFigure>
          <p className={copyClassName}>
            One messy file makes the whole turn messy. A clean list wins over a
            names-only file, so a tidy domain list is kept as a clean list when
            a second file is only names.
          </p>
          <CodeSample code={kindForTurn} />
        </section>

        <section className="flex flex-col gap-6">
          <h2 className={headingClassName}>Where a domain comes from</h2>
          <p className={copyClassName}>
            We try the cheapest source first. A later source runs only for rows
            the earlier source could not resolve. A clean list stops at the
            file. It never goes to the web.
          </p>
          <EssayFigure
            n={8}
            caption="Where a domain comes from. We stop at the first source that works."
          >
            <DomainSources />
          </EssayFigure>
          <p className={copyClassName}>
            A website cell can list more than one domain. We keep the first
            usable one for that row. A work email is next.{" "}
            <span className="font-mono text-sm text-foreground">
              nicole@us.acme.co.uk
            </span>{" "}
            becomes <span className="font-mono text-sm text-foreground">acme.co.uk</span>
            , the company domain, including endings like{" "}
            <span className="font-mono text-sm text-foreground">co.uk</span>. A
            personal inbox such as Gmail is a person, so it stays out.
          </p>
          <CodeSample code={domainForRow} />
          <p className={copyClassName}>
            We drop a duplicate domain and a duplicate company name. A row with
            only a domain gets its name from that domain. A row with neither is
            counted and left out.
          </p>
          <CodeSample code={keepUnique} />
          <p className={copyClassName}>
            For messy text we scan the cells we already extracted. If that scan
            is empty, one fixed script reads the whole file. A crashed run is
            tried a few more times. The script’s output then goes through the
            same cleanup, so it cannot invent a directory domain.
          </p>
          <p className={copyClassName}>
            Names only are matched against companies already in the CRM. What
            is still missing gets one web pass, then a grader that may use only
            those results. Rows from the file are high confidence and start
            checked. A web guess can be medium or low. A low guess starts
            unchecked.
          </p>
          <EssayFigure
            n={9}
            caption="Two cells can name one company. A personal inbox does not land anywhere."
          >
            <DuplicateMerge />
          </EssayFigure>
        </section>

        <section className="flex flex-col gap-6">
          <h2 className={headingClassName}>Writes</h2>
          <p className={copyClassName}>
            Approve stores a job for that file and that selection. The click
            itself creates no accounts. The same click twice reuses the live
            job. A queue is a line of work waiting its turn. The first message
            on that line says “plan.”
          </p>
          <CodeSample code={onApprove} />
          <p className={copyClassName}>
            The worker counts the selected rows, picks a batch size, and marks
            the job running.
          </p>
          <EssayFigure
            n={10}
            caption="Three rows stay one batch. Fifty thousand and a hundred thousand split into a field of batches on one queue."
          >
            <BatchScale />
          </EssayFigure>
          <EssayFigure
            n={11}
            caption="The worker counts the rows, writes each batch, then stops."
          >
            <WorkerLoop />
          </EssayFigure>
          <p className={copyClassName}>
            Three rows never split. Fifty thousand rows are cut into batches of
            about 100 and those batches run side by side on one queue. A
            hundred thousand rows use that same cut, so the field of batches is
            about twice as wide. Past about 500 rows, each batch is its own
            message.             Smaller jobs still walk the batches in order.
          </p>
          <CodeSample code={writeJob} />
          <p className={copyClassName}>
            Each batch reads that window of rows, turns each cell into a domain,
            and calls one bulk create. A company already in the CRM is skipped.
            When every batch is done, the job is completed, partial, failed, or
            cancelled. Partial means some rows landed and some failed. Rows that
            landed are marked at the end, so a later pass does not offer them
            as new. Marking them in the middle would make the next window skip
            rows that were never written.
          </p>
        </section>

        <section className="flex flex-col gap-6">
          <h2 className={headingClassName}>What keeps a run safe</h2>
          <EssayFigure
            n={12}
            caption="One bad cell fails. The rest of that batch still runs."
          >
            <BadCell />
          </EssayFigure>
          <CodeSample code={writeWindow} />
          <ul className={`flex list-disc flex-col gap-3 pl-5 ${copyClassName}`}>
            <li>
              One bad cell is counted as failed. The rest of the batch continues.
            </li>
            <li>
              A validation error is recorded and left there. A temporary error,
              such as a dropped connection, is tried again.
            </li>
            <li>
              If the reply’s counts do not add up to the batch, we correct them
              so progress cannot pass the size of that batch.
            </li>
            <li>
              Stop sets a pause. The worker holds the next batch. The batch
              already sent still finishes.
            </li>
            <li>
              If the queue is missing, the file is still parsing, or nothing is
              selected, the request fails in plain language. It does not pretend
              a job started.
            </li>
            <li>
              An empty window is a failed window. It is recorded, and the job
              keeps its place.
            </li>
            <li>
              Progress is one snapshot of the totals. We send created, skipped,
              and failed, rather than one event per row.
            </li>
          </ul>
        </section>

        <section className="flex flex-col gap-6">
          <h2 className={headingClassName}>What to copy</h2>
          <p className={copyClassName}>
            Decide what kind of file you have before you pick a method. Read
            the file itself before you call the network. Give the model one
            step at a time.
          </p>
          <p className={copyClassName}>
            Keep the rows in a store, and send the model a short count. Make
            each write safe to repeat, and send the rows in batches. Change the
            screen with the count: a list when it is short, a summary and a
            panel when it is long. Let the card say what happened, even when
            the model’s sentence never arrives.
          </p>
        </section>
      </article>
      <div className="flex w-full flex-col gap-12 pt-6">
        <div aria-hidden="true" className="h-px w-8 bg-foreground/20" />
        <ol className="flex list-none flex-col gap-3 p-0">
          {ARTICLE_LINKS.map((article, index) => (
            <li
              key={article.href}
              className="grid grid-cols-[1rem_minmax(0,1fr)] gap-x-1 text-sm tracking-tight text-muted-foreground"
            >
              <sup
                aria-hidden="true"
                className="pt-0.5 text-[0.7em] leading-none font-normal"
              >
                {index + 1}
              </sup>
              <a
                href={article.href}
                target="_blank"
                rel="noopener noreferrer"
                data-scrub-sound=""
                className="-mx-1 rounded px-1 py-0.5 text-pretty leading-relaxed hover:bg-muted hover:text-foreground focus-visible:bg-muted focus-visible:text-foreground"
              >
                {article.description}
              </a>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
