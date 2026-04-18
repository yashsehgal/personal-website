"use client";
import { Button } from "@/components/ui/button";
import { useSignInWithOAuth } from "@/hooks/use-sign-in-with-oauth";
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
  const signIn = useSignInWithOAuth();

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
          {signIn.error ? (
            <p className="col-span-2 text-sm text-destructive" role="alert">
              {signIn.error.message}
            </p>
          ) : null}
          <Button
            type="button"
            variant="outline"
            size="lg"
            className="gap-2"
            disabled={signIn.isPending}
            onClick={() => signIn.mutate("google")}
          >
            <Image
              src={GOOGLE_LOGO}
              priority
              alt=""
              width={20}
              height={20}
              className="size-4 shrink-0 pointer-events-none select-none"
            />
            {signIn.isPending && signIn.variables === "google"
              ? "Redirecting…"
              : "Sign in with Google"}
          </Button>
          <Button
            type="button"
            variant="outline"
            size="lg"
            className="gap-2"
            disabled={signIn.isPending}
            onClick={() => signIn.mutate("github")}
          >
            <Image
              src={GITHUB_LOGO}
              priority
              alt=""
              width={20}
              height={20}
              className="size-4 shrink-0 pointer-events-none select-none mb-px"
            />
            {signIn.isPending && signIn.variables === "github"
              ? "Redirecting…"
              : "Continue with GitHub"}
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
