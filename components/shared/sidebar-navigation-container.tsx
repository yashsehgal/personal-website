import Link from "next/link";

const SIDEBAR_NAVIGATION_ITEMS: { title: string; path: string }[] = [
  {
    title: "Home",
    path: "/",
  },
  {
    title: "About",
    path: "/about",
  },
  {
    title: "Work",
    path: "/work",
  },
  {
    title: "Writings",
    path: "/writings",
  },
];

export function SidebarNavigationContainer() {
  return (
    <aside className="flex flex-col items-start">
      {SIDEBAR_NAVIGATION_ITEMS.map((sidebarNavigationItem, index) => {
        return (
          <Link
            key={index}
            href={sidebarNavigationItem.path}
            className="hover:bg-transparent! text-primary/40! hover:text-primary! w-full transition-none!"
          >
            <p className="text-sm font-medium">{sidebarNavigationItem.title}</p>
          </Link>
        );
      })}
    </aside>
  );
}
