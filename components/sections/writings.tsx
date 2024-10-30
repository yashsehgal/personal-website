import { IconPencil } from '@tabler/icons-react';
import Link from 'next/link';

const WRITINGS: { name: string; slug: string; emoji: string }[] = [
  { name: 'hello there!', slug: 'hello', emoji: '👋🏽' },
];

export default function Writings() {
  return (
    <section className="writings space-y-3">
      <h2 className="text-sm font-semibold">writings</h2>
      <ul className="writing-list">
        {WRITINGS.map((writing, index) => {
          return (
            <li key={index} className="flex items-center gap-2">
              <span>{writing.emoji}</span>
              <Link
                href={`/writing/${writing.slug}`}
                className="text-sm font-semibold">
                {writing.name}
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
