import { ViewContainer } from '@/components/layout/view-container';
import { formatDate } from '@/helpers';
import { SupabaseDiscussionInterface } from '@/interfaces/discussions';
import Link from 'next/link';

export function DiscussionItem({
  id,
  created_at,
  title,
}: SupabaseDiscussionInterface): JSX.Element {
  return (
    <ViewContainer className="discussion-item flex items-center text-sm gap-2">
      <Link
        href={`/discussions/${id}`}
        className="truncate min-w-[12ch] shrink">
        <span className="truncate block">{title || 'Untitled Discussion'}</span>
      </Link>
      <div className="h-[1px] w-full bg-gray-200 shrink" />
      <time
        dateTime={created_at}
        className="text-xs text-gray-500 whitespace-nowrap shrink-0">
        {formatDate(created_at)}
      </time>
    </ViewContainer>
  );
}
