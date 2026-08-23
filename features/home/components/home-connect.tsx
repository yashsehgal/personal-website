import { BasicLink } from "@/components/ui/basic-link";

export function HomeConnect() {
  return (
    <div className="w-lg text-xl text-balance space-y-4 max-md:w-full max-md:text-base max-md:text-left">
      <p className="leading-relaxed">
        You can connect with me on{" "}
        <BasicLink href="https://x.com/yashsehgaldev" target="_blank">
          X (Twitter)
        </BasicLink>
        {" and "}
        <BasicLink href="https://linkedin.com/in/sehgalyash" target="_blank">
          LinkedIn
        </BasicLink>
        . You can see my work on{" "}
        <BasicLink href="https://github.com/yashsehgal" target="_blank">
          GitHub
        </BasicLink>
        .
      </p>
    </div>
  );
}
