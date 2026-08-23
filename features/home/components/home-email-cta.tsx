"use client";

import { getYashMailtoHref } from "@/common/contact";
import { Button } from "@/components/ui/button";
import { MailIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { motion } from "framer-motion";
import { useState } from "react";

export function HomeEmailCta() {
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const handleEmailButtonClick = () => {
    window.location.href = getYashMailtoHref("Hello Yash");
  };

  return (
    <div className="flex items-center justify-start gap-2 -mt-4">
      <Button
        size="lg"
        onClick={handleEmailButtonClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="gap-0"
      >
        <motion.span
          animate={{
            scale: isHovered ? 1 : 0,
            width: isHovered ? "auto" : 0,
          }}
          transition={{
            duration: 0.2,
            bounce: 0,
            type: "spring",
            ease: "circOut",
          }}
        >
          <HugeiconsIcon icon={MailIcon} className="size-4 mr-1.5" />
        </motion.span>
        Write to me via email
      </Button>
    </div>
  );
}
