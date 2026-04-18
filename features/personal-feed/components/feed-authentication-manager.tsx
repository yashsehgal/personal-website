"use client";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import Image from "next/image";

interface FeedAuthenticationManagerProps {
  children: React.ReactNode;
}

const GITHUB_LOGO: string = "/logo/github.svg";
const GOOGLE_LOGO: string = "/logo/google.svg";

export function FeedAuthenticationManager({
  children,
}: FeedAuthenticationManagerProps) {
  return (
    <Drawer>
      <DrawerTrigger asChild>{children}</DrawerTrigger>
      <DrawerContent className="max-w-xl max-lg:max-w-full mx-auto">
        <DrawerHeader>
          <DrawerTitle>Sign in to start new channels</DrawerTitle>
          <DrawerDescription>
            Sign in to start new channels and access your existing channels and
            messages.
          </DrawerDescription>
        </DrawerHeader>
        <div className="grid grid-cols-2 gap-4 px-4">
          <Button variant="outline" size="lg" className="gap-2">
            <Image
              src={GOOGLE_LOGO}
              priority
              alt="Google Logo"
              width={20}
              height={20}
              className="size-4 shrink-0 pointer-events-none select-none"
            />
            Sign in with Google
          </Button>
          <Button variant="outline" size="lg" className="gap-2">
            <Image
              src={GITHUB_LOGO}
              priority
              alt="GitHub Logo"
              width={20}
              height={20}
              className="size-4 shrink-0 pointer-events-none select-none mb-px"
            />
            Continue with GitHub
          </Button>
        </div>
        <DrawerFooter>
          <DrawerClose asChild>
            <Button variant="outline" size="lg">
              Nevermind, I will sign in later
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
