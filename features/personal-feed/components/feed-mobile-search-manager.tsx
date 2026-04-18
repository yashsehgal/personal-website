import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";

interface FeedMobileSearchManagerProps {
  children: React.ReactNode;
}

export function FeedMobileSearchManager({
  children,
}: FeedMobileSearchManagerProps) {
  return (
    <Drawer>
      <DrawerTrigger className="w-full">{children}</DrawerTrigger>
      <DrawerContent></DrawerContent>
    </Drawer>
  );
}
