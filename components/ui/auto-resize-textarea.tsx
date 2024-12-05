import React, { forwardRef, useRef, useEffect } from 'react';
import { TextareaHTMLAttributes } from 'react';

export const AutoResizeTextarea = forwardRef<
  HTMLTextAreaElement,
  TextareaHTMLAttributes<HTMLTextAreaElement>
>((props, ref) => {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const adjustHeight = () => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    // Reset height to allow proper calculation
    textarea.style.height = 'auto';
    // Set new height based on scrollHeight
    textarea.style.height = `${textarea.scrollHeight}px`;
  };

  useEffect(() => {
    adjustHeight();
  }, [props.value]);

  return (
    <textarea
      {...props}
      ref={(node) => {
        textareaRef.current = node;
        // Handle both function refs and object refs
        if (typeof ref === 'function') {
          ref(node);
        } else if (ref) {
          ref.current = node;
        }
      }}
      onChange={(e) => {
        props.onChange?.(e);
        adjustHeight();
      }}
      rows={1}
      style={{
        resize: 'none',
        overflowX: 'hidden',
        overflowY: 'scroll',
        ...props.style,
      }}
    />
  );
});

AutoResizeTextarea.displayName = 'AutoResizeTextarea';
