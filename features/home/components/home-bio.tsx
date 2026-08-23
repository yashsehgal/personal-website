import { BasicLink } from "@/components/ui/basic-link";

export function HomeBio() {
  return (
    <div className="w-lg text-2xl text-balance space-y-4 max-md:w-full max-md:text-base max-md:text-left">
      <p className="leading-relaxed">
        Hi, I am Yash. I am a design engineer based in Bombay, India.
      </p>
      <p className="leading-relaxed">
        In my experience, I have worked with various web-based technologies and
        languages. I personally love the ergonomics of TypeScript and the React
        ecosystem.
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
  );
}
