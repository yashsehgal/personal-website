import { StackAiExperienceMediaSlot } from "@/modules/work-page/stack-ai-experience-media-slot";

const COPY_NODE_DEMO_SRC =
  "/work/stack-ai/copy-paste-nodes-demos/copy-node-demo.gif";
const PASTE_NODE_DEMO_SRC =
  "/work/stack-ai/copy-paste-nodes-demos/paste-node-demo.gif";
const TOOLS_SEARCH_SRC =
  "/work/stack-ai/tools-and-node-search-demos/tools-search.mp4";
const TOOLS_SEARCH_POSTER_SRC =
  "/work/stack-ai/tools-and-node-search-demos/tools-search.jpg";
const NODE_SEARCH_SRC =
  "/work/stack-ai/tools-and-node-search-demos/node-search-inside-workflow-demo.mp4";
const NODE_SEARCH_POSTER_SRC =
  "/work/stack-ai/tools-and-node-search-demos/node-search-inside-workflow-demo.jpg";
const KB_EVALS_DEMO_SRC = "/work/stack-ai/kb-evals-demos/kb-evals-demo.png";
const ARCHIVE_SUGGESTIONS_DEMO_SRC =
  "/work/stack-ai/archive-suggestions-demos/archive-suggestions-demo.png";

export function StackAiExperienceBodySection() {
  return (
    <section
      aria-label="Work at StackAI"
      className="flex max-w-2xl flex-col gap-12 font-sans text-sm font-medium leading-relaxed text-muted-foreground/70"
    >
      <article className="space-y-3">
        <p>
          I joined StackAI in January 2025. The team was really small, around
          7-8 people, including both co-founders, engineers, sales and
          operations. Before I joined, the product had some really good features
          that were well implemented and generated sales for different
          enterprise customers. My role was to make the entire agent creation
          and dashboard/platform experience better.
        </p>
        <p>
          I started mostly on fixing the tables and widgets we were showing on
          the dashboard: workflow projects table, knowledge bases, seats per
          plan. Then I picked settings pages one by one. I really like the
          design Linear uses for settings, and I used a similar design approach
          to improve the platform settings.
        </p>
      </article>
      <article className="space-y-3">
        <h2 className="text-sm font-medium leading-relaxed text-foreground">
          Copy/pasting nodes across workflows
        </h2>
        <p>
          We had this issue where a user has a node in a workflow project A,
          with proper configurations and agent connections, and wants to reuse a
          similar node in another project. React-flow stores each and everything
          for a node in a JSON object, and copying that JSON was taking a lot of
          time.
        </p>
        <p>
          I used local-storage rather than copying, because storing a JSON
          inside local-storage is faster. When a user pasted, using keyboard
          shortcuts or the right-click menu, I rendered the stored object onto
          the workflow without clearing local-storage, so paste could happen
          more than once.
        </p>
      </article>
      <StackAiExperienceMediaSlot
        src={COPY_NODE_DEMO_SRC}
        alt="Copying a configured node from a StackAI workflow"
      />
      <StackAiExperienceMediaSlot
        src={PASTE_NODE_DEMO_SRC}
        alt="Pasting a copied node into another StackAI workflow"
      />
      <article className="space-y-3">
        <h2 className="text-sm font-medium leading-relaxed text-foreground">
          Worklfow Node Search
        </h2>
        <p>
          We offered many options, tools, and node types, but filtering and
          locating nodes by category or type was difficult. I added a way to add
          a node directly in the workflow: right-click to see a list of nodes,
          or add a dummy node and select everything in a configuration panel.
          Users can also search by keyword. Searching for &ldquo;agent,&rdquo;
          &ldquo;AI,&rdquo; or &ldquo;LLM&rdquo; returns AI agent.
        </p>
        <p>
          All results were filtered and grouped into categories, so adding new
          nodes was linear and fast. Users appreciated staying in the workflow
          without being redirected to a settings panel.
        </p>
      </article>
      <StackAiExperienceMediaSlot
        src={TOOLS_SEARCH_SRC}
        poster={TOOLS_SEARCH_POSTER_SRC}
        alt="Searching tools and node types in StackAI"
        width={2540}
        height={1754}
        videoClassName="scale-[1.03] object-cover"
      />
      <StackAiExperienceMediaSlot
        src={NODE_SEARCH_SRC}
        poster={NODE_SEARCH_POSTER_SRC}
        alt="Searching and adding a node inside a StackAI workflow"
        width={1906}
        height={1252}
      />
      <article className="space-y-3">
        <h2 className="text-sm font-medium leading-relaxed text-foreground">
          Archive Suggestions
        </h2>
        <p>
          This began as a weekend side project. It was not highly requested, but
          I believed it was important because it helps customers reduce costs
          and clean up their dashboards. One of our customers was MIT Sloan.
          Professors created accounts for every student, and each account got
          its own personal folder. When a new batch started, the old
          batch&apos;s folders and workflows were still there, and deleting them
          by hand was tiring.
        </p>
        <p>
          I added a suggestion for archivable projects: projects that have not
          been used, un-opened, or had a workflow run for a period of
          inactivity. They show up in a dedicated section, so users can delete
          them one by one or select all and remove them at once.
        </p>
      </article>
      <StackAiExperienceMediaSlot
        src={ARCHIVE_SUGGESTIONS_DEMO_SRC}
        alt="Archive suggestions for unused StackAI workflow projects"
        width={2518}
        height={746}
      />
      <article className="space-y-3">
        <h2 className="text-sm font-medium leading-relaxed text-foreground">
          Knowledge Base Evaluations
        </h2>
        <p>
          This was my first project where I actually wrote backend code. I
          focused on evaluating the chunks associated with the keywords that the
          RAG system stored in a knowledge base. Users can search for a keyword
          or a sentence and see which chunks come back through semantic search,
          keyword search, or hybrid searches, and they can select the chunk
          size.
        </p>
        <p>
          I wrote APIs on top of functions that already existed and built a
          playground UI. Users enter a query, see results with a relevance score
          and the corresponding chunks, and the search keywords are highlighted
          in the chunk.
        </p>
      </article>
      <StackAiExperienceMediaSlot
        src={KB_EVALS_DEMO_SRC}
        alt="Knowledge base evaluation playground with search results and chunk scores"
        width={3024}
        height={1598}
      />
    </section>
  );
}
