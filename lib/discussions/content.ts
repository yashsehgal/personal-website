export type DiscussionMark = {
  type: string;
  attrs?: Record<string, unknown>;
};

export type DiscussionContent = {
  type?: string;
  attrs?: Record<string, unknown>;
  content?: DiscussionContent[];
  marks?: DiscussionMark[];
  text?: string;
};

export type DiscussionSummary = {
  id: string;
  title: string;
  createdAt: string;
  replyCount: number;
};

export type DiscussionMessage = {
  id: string;
  discussionId: string;
  body: DiscussionContent;
  createdAt: string;
};

export type DiscussionThread = {
  id: string;
  title: string;
  createdAt: string;
  messages: DiscussionMessage[];
};

export const DISCUSSION_TITLE_MAX_LENGTH = 200;
export const DISCUSSION_BODY_MAX_CHARS = 20_000;
export const DISCUSSION_BODY_MAX_NODES = 400;
export const DISCUSSION_MESSAGES_POLL_MS = 2500;

const UUID_PATTERN =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

const ALLOWED_NODES = new Set([
  "doc",
  "paragraph",
  "text",
  "bulletList",
  "orderedList",
  "listItem",
  "hardBreak",
  "blockquote",
]);

const ALLOWED_MARKS = new Set(["bold", "italic", "strike", "code"]);

export function isDiscussionId(value: string) {
  return UUID_PATTERN.test(value);
}

export function normalizeDiscussionTitle(value: string) {
  return value.replace(/\s+/g, " ").trim();
}

export function getDiscussionPlainText(
  node: DiscussionContent | null | undefined,
): string {
  if (!node) {
    return "";
  }

  if (node.type === "hardBreak") {
    return "\n";
  }

  if (typeof node.text === "string") {
    return node.text;
  }

  const inner = (node.content ?? []).map(getDiscussionPlainText).join("");
  const isBlock =
    node.type === "paragraph" ||
    node.type === "listItem" ||
    node.type === "blockquote" ||
    node.type === "bulletList" ||
    node.type === "orderedList";

  return isBlock ? `${inner}\n` : inner;
}

export function formatReplyCount(count: number) {
  return count === 1 ? "1 reply" : `${count} replies`;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function sanitizeMarks(marks: unknown): DiscussionMark[] | undefined {
  if (!Array.isArray(marks)) {
    return undefined;
  }

  const next = marks.flatMap((mark) => {
    if (!isRecord(mark) || typeof mark.type !== "string") {
      return [];
    }

    if (!ALLOWED_MARKS.has(mark.type)) {
      return [];
    }

    return [{ type: mark.type }];
  });

  return next.length > 0 ? next : undefined;
}

function sanitizeNode(
  value: unknown,
  stats: { nodes: number },
): DiscussionContent | null {
  if (stats.nodes > DISCUSSION_BODY_MAX_NODES || !isRecord(value)) {
    return null;
  }

  stats.nodes += 1;

  const type = typeof value.type === "string" ? value.type : undefined;

  if (!type || !ALLOWED_NODES.has(type)) {
    return null;
  }

  if (type === "text") {
    if (typeof value.text !== "string" || value.text.length === 0) {
      return null;
    }

    return {
      type,
      text: value.text,
      marks: sanitizeMarks(value.marks),
    };
  }

  if (type === "hardBreak") {
    return { type };
  }

  const content = Array.isArray(value.content)
    ? value.content.flatMap((child) => {
        const node = sanitizeNode(child, stats);
        return node ? [node] : [];
      })
    : undefined;

  const node: DiscussionContent = { type };

  if (type === "orderedList" && isRecord(value.attrs) && typeof value.attrs.start === "number") {
    node.attrs = { start: value.attrs.start };
  }

  if (content && content.length > 0) {
    node.content = content;
  }

  return node;
}

export function sanitizeDiscussionBody(value: unknown): DiscussionContent | null {
  const stats = { nodes: 0 };
  const node = sanitizeNode(value, stats);

  if (!node || node.type !== "doc") {
    return null;
  }

  const text = getDiscussionPlainText(node).trim();

  if (!text || text.length > DISCUSSION_BODY_MAX_CHARS) {
    return null;
  }

  if (!node.content || node.content.length === 0) {
    return null;
  }

  return node;
}
