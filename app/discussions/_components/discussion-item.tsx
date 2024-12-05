import { formatDate } from '@/helpers';
import { SupabaseDiscussionInterface } from '@/interfaces/discussions';
import Link from 'next/link';

export function DiscussionItem({
  id,
  created_at,
  title,
}: SupabaseDiscussionInterface): JSX.Element {
  return (
    <div className="discussion-item flex items-center justify-between text-sm gap-2">
      <Link href={`/discussions/${id}`} className="shrink-0">
        {title || 'Untitled Discussion'}
      </Link>
      <div className="h-[1px] w-full bg-gray-200" />
      <time dateTime={created_at} className="text-sm text-gray-500 shrink-0">
        {formatDate(created_at)}
      </time>
    </div>
  );
}
