"use client";

import { Button } from "@/components/ui/button";
import { FeedAuthenticationManager } from "@/features/personal-feed/components/feed-authentication-manager";

export function FeedAuthenticationCTA() {
  return (
    <div className="flex flex-col items-start w-full gap-2.5 select-none">
      <div className="px-1.5 flex flex-col items-start w-full gap-1">
        <p className="text-sm font-medium">Sign in to create new chats</p>
        <p className="text-sm text-muted-foreground">
          You can sign in to chat in public and personal channels with an
          account. You can also create multiple chat sessions privately.
        </p>
      </div>
      <FeedAuthenticationManager>
        <Button variant="outline" size="sm" className="w-full">
          Sign in
        </Button>
      </FeedAuthenticationManager>
    </div>
  );
}
