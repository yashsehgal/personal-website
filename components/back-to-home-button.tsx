import { ROUTES } from "@/common/routes";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Link from "next/link";

export function BackToHomeButton() {
  return (
    <Button variant="ghost" asChild>
      <Link href={ROUTES.HOME}>
        <HugeiconsIcon icon={ChevronLeft} className="size-4" />
        Back to home
      </Link>
    </Button>
  );
}
