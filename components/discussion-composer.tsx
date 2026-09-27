"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  discussionEditorExtensions,
  emptyDiscussionDoc,
} from "@/lib/discussions/editor";
import {
  EditorContent,
  useEditor,
  useEditorState,
  type JSONContent,
} from "@tiptap/react";
import { Bold, Italic, List, ListOrdered } from "lucide-react";
import { useEffect, useId, type ReactNode } from "react";

const toolbarButtonClassName =
  "inline-flex size-8 items-center justify-center rounded-lg text-muted-foreground transition-[background-color,color,scale] duration-150 ease-out hover:bg-muted hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none active:scale-[0.96] aria-pressed:bg-muted aria-pressed:text-foreground";

function FormatButton({
  label,
  pressed = false,
  disabled = false,
  onClick,
  children,
}: {
  label: string;
  pressed?: boolean;
  disabled?: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <Tooltip>
      <TooltipTrigger
        type="button"
        className={toolbarButtonClassName}
        aria-pressed={pressed}
        aria-label={label}
        disabled={disabled}
        onClick={onClick}
      >
        {children}
      </TooltipTrigger>
      <TooltipContent>{label}</TooltipContent>
    </Tooltip>
  );
}

export function DiscussionComposer({
  disabled = false,
  error,
  onSubmit,
}: {
  disabled?: boolean;
  error?: string | null;
  onSubmit: (body: JSONContent) => void;
}) {
  const editorLabelId = useId();
  const errorId = useId();
  const editor = useEditor({
    immediatelyRender: false,
    extensions: discussionEditorExtensions,
    content: emptyDiscussionDoc,
    editorProps: {
      attributes: {
        class: "discussion-rich-text discussion-rich-text-editor",
        "aria-labelledby": editorLabelId,
      },
    },
  });

  const editorState = useEditorState({
    editor,
    selector: ({ editor: currentEditor }) => ({
      isBold: currentEditor?.isActive("bold") ?? false,
      isItalic: currentEditor?.isActive("italic") ?? false,
      isBulletList: currentEditor?.isActive("bulletList") ?? false,
      isOrderedList: currentEditor?.isActive("orderedList") ?? false,
    }),
  });

  useEffect(() => {
    editor?.setEditable(!disabled);
  }, [disabled, editor]);

  useEffect(() => {
    const proseMirror = editor?.view.dom;

    if (!proseMirror) {
      return;
    }

    if (error) {
      proseMirror.setAttribute("aria-invalid", "true");
      proseMirror.setAttribute("aria-describedby", errorId);
      return;
    }

    proseMirror.removeAttribute("aria-invalid");
    proseMirror.removeAttribute("aria-describedby");
  }, [editor, error, errorId]);

  const sendReply = () => {
    if (!editor || disabled) {
      return;
    }

    onSubmit(editor.getJSON());
    editor.commands.clearContent(true);
    editor.commands.focus();
  };

  return (
    <form
      className="rounded-xl border border-border bg-background p-3 shadow-2xs"
      onSubmit={(event) => {
        event.preventDefault();
        sendReply();
      }}
      onKeyDown={(event) => {
        if (event.key === "Enter" && (event.metaKey || event.ctrlKey)) {
          event.preventDefault();
          sendReply();
        }
      }}
    >
      <div className="flex flex-col gap-2">
        <Label id={editorLabelId}>Reply</Label>
        <EditorContent editor={editor} className="min-w-0" />
        {error ? (
          <p id={errorId} role="alert" className="text-sm text-destructive">
            {error}
          </p>
        ) : null}
        <div className="flex flex-wrap items-center justify-between gap-2">
          <TooltipProvider>
            <div className="flex items-center gap-0.5">
              <FormatButton
                label="Bold"
                pressed={editorState?.isBold}
                disabled={!editor || disabled}
                onClick={() => editor?.chain().focus().toggleBold().run()}
              >
                <Bold aria-hidden="true" className="size-3.5" />
              </FormatButton>
              <FormatButton
                label="Italic"
                pressed={editorState?.isItalic}
                disabled={!editor || disabled}
                onClick={() => editor?.chain().focus().toggleItalic().run()}
              >
                <Italic aria-hidden="true" className="size-3.5" />
              </FormatButton>
              <FormatButton
                label="Bulleted list"
                pressed={editorState?.isBulletList}
                disabled={!editor || disabled}
                onClick={() => editor?.chain().focus().toggleBulletList().run()}
              >
                <List aria-hidden="true" className="size-3.5" />
              </FormatButton>
              <FormatButton
                label="Numbered list"
                pressed={editorState?.isOrderedList}
                disabled={!editor || disabled}
                onClick={() => editor?.chain().focus().toggleOrderedList().run()}
              >
                <ListOrdered aria-hidden="true" className="size-3.5" />
              </FormatButton>
            </div>
          </TooltipProvider>
          <Button type="submit" size="sm" disabled={disabled}>
            Send reply
          </Button>
        </div>
      </div>
    </form>
  );
}
