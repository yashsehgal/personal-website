"use client";

import { IMAGE_PROFILE_MAIN } from "@/common/assets";
import Image from "next/image";
import { BasicLink } from "@/components/ui/basic-link";
import { Button } from "@/components/ui/button";
import { HugeiconsIcon } from "@hugeicons/react";
import { MailIcon } from "@hugeicons/core-free-icons";
import { YASH_CONTACT_EMAIL } from "@/common/contact";
import { motion } from "framer-motion";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Home() {
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const handleEmailButtonClick = () => {
    const mailConfig = {
      to: YASH_CONTACT_EMAIL,
      subject: "Hello Yash",
    };

    window.location.href = `mailto:${mailConfig.to}?subject=${encodeURIComponent(mailConfig.subject)}`;
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div className="p-8 space-y-12">
      <header className="flex items-start justify-between">
        {/* PROFILE SECTION */}
        <div className="flex flex-col items-start justify-start gap-7">
          <div className="size-32 overflow-hidden">
            <Image
              preload
              src={IMAGE_PROFILE_MAIN}
              alt="Profile"
              className="object-cover size-auto select-none pointer-events-none"
              width={400}
              height={400}
            />
          </div>
          <div className="flex flex-col items-start justify-start gap-7">
            <p className="text-lg leading-0">Yash Sehgal</p>
            <p className="text-lg text-muted-foreground leading-0">
              Design Engineer
            </p>
          </div>
        </div>
        {/* NAVIGATION SECTION */}
        <div className="flex items-center justify-end gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost">Elsewhere</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>Cafes</DropdownMenuItem>
              <DropdownMenuItem>Gallery</DropdownMenuItem>
              <DropdownMenuItem>Music</DropdownMenuItem>
              <DropdownMenuItem>Writings</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button variant="ghost">About</Button>
        </div>
      </header>
      <div className="space-y-8">
        <div className="w-lg text-2xl text-balance space-y-4 max-md:w-full max-md:text-base max-md:text-left">
          <p className="leading-relaxed">
            Hi, I am Yash. I am a design engineer based in Bombay, India.
          </p>
          <p className="leading-relaxed">
            In my experience, I have worked with various web-based technologies
            and languages. I personally love the ergonomics of TypeScript and
            the React ecosystem.
          </p>
          <p className="leading-relaxed">
            As of today, I am working as a design engineer at{" "}
            <BasicLink href="https://octolane.com" target="_blank">
              Octolane
            </BasicLink>{" "}
            where I work on the design system and the design language of the
            platform.
          </p>
          <p className="leading-relaxed">
            Before this, I was at{" "}
            <BasicLink href="https://stackai.com" target="_blank">
              StackAI
            </BasicLink>
            {", as a founding design engineer. Previous to that, I worked at "}
            <BasicLink href="https://github.com/home" target="_blank">
              GitHub, Inc.
            </BasicLink>
            {" and "}
            <BasicLink href="https://rocketium.com" target="_blank">
              Rocketium
            </BasicLink>
            .
          </p>
        </div>
        <div className="w-lg text-xl text-balance space-y-4 max-md:w-full max-md:text-base max-md:text-left">
          <p className="leading-relaxed">
            You can connect with me on{" "}
            <BasicLink href="https://x.com/yashsehgaldev" target="_blank">
              X (Twitter)
            </BasicLink>
            {" and "}
            <BasicLink
              href="https://linkedin.com/in/sehgalyash"
              target="_blank"
            >
              LinkedIn
            </BasicLink>
            . You can see my work on{" "}
            <BasicLink href="https://github.com/yashsehgal" target="_blank">
              GitHub
            </BasicLink>
            .
          </p>
        </div>
      </div>
      <div className="flex items-center justify-start gap-2 -mt-4">
        <Button
          size="lg"
          onClick={handleEmailButtonClick}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
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
    </div>
  );
}
