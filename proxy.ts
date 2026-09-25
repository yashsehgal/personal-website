import { WEBSITE_ROUTES } from "@/common/routes";
import { NextResponse, userAgent, type NextRequest } from "next/server";

const BLOCKED_DEVICE_TYPES = new Set(["mobile", "tablet"]);

export function proxy(request: NextRequest) {
  const { device } = userAgent(request);

  if (!device.type || !BLOCKED_DEVICE_TYPES.has(device.type)) {
    return NextResponse.next();
  }

  return NextResponse.redirect(new URL(WEBSITE_ROUTES.HOME, request.url));
}

export const config = {
  matcher: "/apps/music/:path*",
};
