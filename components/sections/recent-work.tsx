import { ResponsiveControl } from "../layouts/responsive-control";
import { SectionContainer } from "../layouts/section-container";

export default function RecentWorks() {
  return <SectionContainer id="recent-works">
    <ResponsiveControl>
      <h2 className="leading-snug tracking-tight font-medium">
        {"Recent work"}
      </h2>
    </ResponsiveControl>
  </SectionContainer>
}