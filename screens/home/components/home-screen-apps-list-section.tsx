import Link from "next/link";

const MICRO_APPS: { title: string; description: string; path: string }[] = [
  {
    title: "Messages",
    description: "Simple messaging app within my website",
    path: "/messages",
  },
  {
    title: "Music",
    description: "A collection of songs I like",
    path: "/music",
  },
  {
    title: "Photos",
    description: "A gallery of pictures I've taken over the years",
    path: "/photos",
  },
];

export function HomeScreenAppsListSection() {
  return (
    <section className="space-y-3">
      <header className="px-3">
        <h2 className="text-sm font-medium text-primary/40">Apps</h2>
      </header>
      <div className="space-y-4 w-lg">
        {MICRO_APPS.map((app, index) => {
          return (
            <Link key={index} href={app.path}>
              <div className="p-3 rounded-lg space-y-1.5 hover:bg-accent">
                <h3 className="text-base font-medium">{app.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {app.description}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
