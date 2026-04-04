"use client";

import { BasicLink } from "@/components/ui/basic-link";
import { Button } from "@/components/ui/button";
import { MailIcon } from "lucide-react";

export default function Home() {
  const handleWriteToMeViaEmail = () => {
    const emailAddress = "yashsehgal.work@gmail.com";
    const subject = "Hello, Yash!";
    const emailLink = `mailto:${emailAddress}?subject=${subject}`;
    window.location.href = emailLink;
  };

  return (
    <div className="home">
      <div className="space-y-8">
        <div className="w-md text-base tracking-tight space-y-4 max-md:w-full">
          <p className="leading-relaxed">
            Hi, I am Yash. I am a design engineer based out of India, also
            working from San Francisco, CA.
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
          <p>
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
        <div className="w-md text-base tracking-tight space-y-4 max-md:w-full">
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
      <div className="flex items-center justify-start gap-2 mt-6">
        <Button variant="default" onClick={handleWriteToMeViaEmail} size="lg">
          <MailIcon className="size-4 shrink-0" />
          Write to me via email
        </Button>
      </div>
    </div>
  );
}
