import Link from 'next/link';

const WRITINGS: { name: string; slug: string; emoji: string }[] = [
  { name: 'Hello there!', slug: 'hello', emoji: '👋🏽' },
  {
    name: 'iOS like app drawer',
    slug: 'ios-like-app-drawer',
    emoji: '📱',
  },
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
  {
    name: 'Dropdown with micro interactions',
    slug: 'dropdown-with-micro-interactions',
    emoji: '✨',
  },
  {
    name: 'Video layers',
    slug: 'video-layers',
    emoji: '📀',
  },
  {
    name: 'CTA with micro interactions',
    slug: 'cta-with-micro-interactions',
    emoji: '🗂️',
  },
  {
    name: 'Platform usage card',
    slug: 'platform-usage-card',
    emoji: '📊',
  },
  {
    name: 'Integrations',
    slug: 'integrations',
    emoji: '🔗',
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
