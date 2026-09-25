import { AppsDeviceGuard } from "@/components/apps-device-guard";

export default function MusicLayout({ children }: LayoutProps<"/apps/music">) {
  return <AppsDeviceGuard>{children}</AppsDeviceGuard>;
}
