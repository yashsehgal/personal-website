import {
  getDiscussionPlainText,
  type DiscussionContent,
  type DiscussionMark,
} from "@/lib/discussions/content";
import { cn } from "cn";
import type { ReactNode } from "react";

function renderMarks(text: string, marks: DiscussionMark[] | undefined, key: string) {
  return (marks ?? []).reduce<ReactNode>((child, mark, index) => {
    const markKey = `${key}-${mark.type}-${index}`;

    if (mark.type === "bold") {
      return <strong key={markKey}>{child}</strong>;
    }

    if (mark.type === "italic") {
      return <em key={markKey}>{child}</em>;
    }

    if (mark.type === "strike") {
      return <s key={markKey}>{child}</s>;
    }

    if (mark.type === "code") {
      return <code key={markKey}>{child}</code>;
    }

    return child;
  }, text);
}

function renderNodes(nodes: DiscussionContent[] | undefined): ReactNode {
  return nodes?.map((node, index) => (
    <DiscussionRichNode key={`${node.type ?? "node"}-${index}`} node={node} />
  ));
}

function DiscussionRichNode({ node }: { node: DiscussionContent }) {
  if (node.type === "text") {
    return renderMarks(node.text ?? "", node.marks, node.text ?? "text");
  }

  if (node.type === "hardBreak") {
    return <br />;
  }

  if (node.type === "paragraph") {
    return <p>{renderNodes(node.content)}</p>;
  }

  if (node.type === "bulletList") {
    return <ul>{renderNodes(node.content)}</ul>;
  }

  if (node.type === "orderedList") {
    const start =
      typeof node.attrs?.start === "number" ? node.attrs.start : undefined;

    return <ol start={start}>{renderNodes(node.content)}</ol>;
  }

  if (node.type === "listItem") {
    return <li>{renderNodes(node.content)}</li>;
  }

  if (node.type === "blockquote") {
    return <blockquote>{renderNodes(node.content)}</blockquote>;
  }

  return <>{renderNodes(node.content)}</>;
}

export function DiscussionRichText({
  content,
  className,
}: {
  content: DiscussionContent;
  className?: string;
}) {
  const text = getDiscussionPlainText(content).trim();

  if (!text) {
    return null;
  }

  return (
    <div className={cn("discussion-rich-text", className)}>
      {content.type === "doc" ? renderNodes(content.content) : (
        <DiscussionRichNode node={content} />
      )}
    </div>
  );
}
