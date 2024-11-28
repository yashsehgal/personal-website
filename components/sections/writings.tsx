import Link from 'next/link';

const WRITINGS: { name: string; slug: string; emoji: string }[] = [
  { name: 'Hello there!', slug: 'hello', emoji: '👋🏽' },
  {
    name: 'How I write extensive react components (ui elements)',
    slug: 'extensive-react-components',
    emoji: '🔮',
  },
  {
    name: 'Writing a dynamic island component',
    slug: 'dynamic-island',
    emoji: '🏝️',
  },
  {
    name: 'Creating a figma like comment pin',
    slug: 'comment-pin',
    emoji: '📌',
  },
  {
    name: 'Automation flow component',
    slug: 'automation-flow-component',
    emoji: '⚙️',
  },
];

export default function Writings() {
  return (
    <section className="writings space-y-3">
      <h2 className="text-sm font-semibold">Writings</h2>
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
