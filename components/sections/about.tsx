import Link from "next/link";
import { ResponsiveControl } from "../layouts/responsive-control";
import { SectionContainer } from "../layouts/section-container";

export default function About() {
    return <SectionContainer id="about">
        <ResponsiveControl>
            <h2 className="leading-snug tracking-tight font-medium">
                {"Who am I?"}
            </h2>
            <div className="mt-3 about-me-content-container grid gap-3">
                <p className="text-gray-500 text-sm tracking-tight">
                    I am a design nerd who codes to build beautiful, accessible UI components. Experimenting with Framer motion, React, Tailwind & Typescript - To build with better design and DX.
                </p>
                <p className="text-gray-500 text-sm tracking-tight">
                    Currently, I am working as a Frontend Software Engineer at <Link href={'https://rocketium.com/'} target="_blank">Rocketium</Link>.
                </p>
                <p className="text-gray-500 text-sm tracking-tight">
                    Previously, built experiences & frontend for <Link href="https://github.com/home" target="_blank">GitHub</Link>, <Link href="https://joinclamp.com" target="_blank">Clamp</Link> and <Link href="https://economize.cloud">Economize</Link>.
                </p>
            </div>
        </ResponsiveControl>
    </SectionContainer>
}