import { ResponsiveControl } from "../layouts/responsive-control";
import { SectionContainer } from "../layouts/section-container";

export default function HeroSection() {
  return <SectionContainer id="hero">
    <ResponsiveControl>
      <h1 className="hero-headline text-4xl leading-snug tracking-tighter font-medium">
        Hi, I am Yash!
      </h1>
      <p className="tracking-tight font-normal text-base text-gray-500">
        {"A design-centric frontend software engineer from India."}
      </p>
    </ResponsiveControl>
  </SectionContainer>
}