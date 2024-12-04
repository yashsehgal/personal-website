import { formatDate } from '@/helpers';
import { SupabaseMessageInterface } from '@/interfaces/discussions';
import ReactMarkdown from 'react-markdown';

export function CommentItem({
  content,
  created_at,
}: SupabaseMessageInterface): JSX.Element {
  return (
    <div className="comment-item-container border rounded p-4 pb-12 overflow-hidden relative font-sans">
      <ReactMarkdown className="text-gray-800 text-sm whitespace-pre-wrap [&>p>code]:bg-indigo-100 [&>p>code]:text-indigo-500 [&>p>code]:px-1 [&>p>code]:py-0.5 [&>p>code]:rounded">
        {content}
      </ReactMarkdown>
      <div className="comment-details-wrapper text-xs text-gray-500 bg-gray-100 absolute bottom-0 left-0 w-full px-2 py-1 flex items-center justify-end border-t">
        <time dateTime={created_at}>Posted {formatDate(created_at)}</time>
      </div>
    </div>
  );
}
