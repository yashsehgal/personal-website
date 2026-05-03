"use client";

import { IMAGE_PROFILE_MAIN } from "@/common/assets";
import { ROUTES } from "@/common/routes";
import { FeedPrimaryOption } from "@/features/personal-feed/components/feed-primary-option";
import { Chat01Icon, Home03Icon } from "@hugeicons/core-free-icons";
import { usePathname, useRouter } from "next/navigation";
import { useMemo } from "react";

export function FeedsPrimarySidebar() {
  const router = useRouter();
  const pathname = usePathname();

  const isGeneralChannelActive = useMemo((): boolean => {
    return pathname === ROUTES.FEED;
  }, [pathname]);

  const handleGoToHome = () => {
    router.push(ROUTES.HOME);
  };

  return (
    <aside className="flex items-center justify-start flex-col px-3 gap-1">
      <div className="h-12 mt-0.5">
        <FeedPrimaryOption
          onClick={handleGoToHome}
          optionName="Back to home page"
          optionContent={{ icon: Home03Icon }}
        />
      </div>
      <div className="gap-2 flex flex-col items-center justify-start">
        <FeedPrimaryOption
          optionName="General Feed"
          optionContent={{ imageSrc: IMAGE_PROFILE_MAIN }}
          isOptionActive={isGeneralChannelActive}
        />
        <FeedPrimaryOption
          className="bg-indigo-500 text-white hover:bg-indigo-600"
          optionName="Sign in to create a channel"
          optionContent={{ icon: Chat01Icon }}
        />
      </div>
    </aside>
  );
}
