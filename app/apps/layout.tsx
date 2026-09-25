import { AppsDeviceGuard } from "@/components/apps-device-guard";

export default function AppsLayout({ children }: LayoutProps<"/apps">) {
  return <AppsDeviceGuard>{children}</AppsDeviceGuard>;
}
