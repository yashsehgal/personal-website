import type { JSONContent } from "@tiptap/react";
import Placeholder from "@tiptap/extension-placeholder";
import StarterKit from "@tiptap/starter-kit";

export const discussionEditorExtensions = [
  StarterKit.configure({
    heading: false,
    codeBlock: false,
    horizontalRule: false,
    link: false,
    underline: false,
  }),
  Placeholder.configure({
    placeholder: "Write a reply",
  }),
];

export const emptyDiscussionDoc: JSONContent = {
  type: "doc",
  content: [{ type: "paragraph" }],
};
