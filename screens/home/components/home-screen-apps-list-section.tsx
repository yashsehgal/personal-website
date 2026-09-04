import Link from "next/link";

const MICRO_APPS: { title: string; description: string; path: string }[] = [
  {
    title: "Messages",
    description: "Simple messaging app within my website",
    path: "/messages",
  },
  {
    title: "Songs",
    description: "A collection of songs I like",
    path: "/songs",
  },
];

export function HomeScreenAppsListSection() {
  return (
    <>
      <section className="space-y-4 w-lg">
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
      </section>
    </>
  );
}
