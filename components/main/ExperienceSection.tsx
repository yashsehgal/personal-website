import { ViewContainerPropsType } from "@/types";
import Image from "next/image";
import { ViewContainer } from "../layout/ViewContainer"
import { Action } from "../ui/Action";
import { ComicButton } from "../ui/Button";
import { DesignHeadline } from "../ui/DesignHeadline";

export const ExperienceSection: React.FunctionComponent = () => {
    return (
        <section className="bg-zinc-900 section-container" id="cursor-lighter">
            <ViewContainer>
                <DesignHeadline className="text-6xl text-white">
                    Your best frontend<br />and design partner.
                </DesignHeadline>
                <div className="experience-container my-12 grid grid-cols-1 gap-6 justify-between">
                    <div className="flex flex-row items-stretch justify-center gap-6">
                        <div className="grid grid-cols-2 items-stretch w-full gap-6">
                            {[
                                { headline: "Always", description: "mentoring" },
                                { headline: "2+ years", description: "experience" },
                                { headline: <>10<sup>+</sup></>, description: "successful projects" },
                                { headline: <>100<span className="text-base">%</span></>, description: "passion for design" },
                            ]?.map((block, blockIndex) => (
                                <ExperienceBox key={blockIndex}>
                                    <h3 className="text-white font-normal text-3xl font-general leading-snug">
                                        {block?.headline}
                                    </h3>
                                    <p className="text-zinc-500 text-lg">
                                        {block?.description}
                                    </p>
                                </ExperienceBox>
                            ))}
                        </div>
                        <ExperienceBox>
                            <h3 className="leading-snug text-white font-normal text-3xl font-general">
                                {"Working somwhere between frontend engineering and UI design."}
                            </h3>
                            <p className="text-zinc-500 text-lg mt-6 leading-8">
                                With years of experience in frontend web design, I have been
                                working on websites and UI designs in my daily routine.
                                I crave for good and minimal designs and try to replicate
                                them in my projects.
                            </p>
                            <p className="text-zinc-500 text-lg leading-8 mt-4">
                                I love to work with React, NextJS, Figma, Typescript on my daily basis.
                            </p>
                        </ExperienceBox>
                    </div>
                    <div className="flex flex-row items-stretch justify-between gap-6">
                        <ExperienceBox className="relative h-[400px]">
                            <h3 className="leading-snug text-white font-normal text-3xl font-general">
                                {"Clean code, accessibility focused."}
                            </h3>
                            <div className="code-snippet-wrapper absolute -bottom-10 -right-36">
                                <Image
                                    src={"/media/experience-code-snippet.svg"}
                                    width={"600"}
                                    height={"200"}
                                    alt="code-snippet"
                                    priority
                                />
                            </div>
                        </ExperienceBox>
                        <ExperienceBox className="relative">
                            <h3 className="leading-snug text-white font-normal text-3xl font-general">
                                {"My Most Used Tech."}
                            </h3>
                            <p className="text-zinc-500 text-lg mt-6 leading-8">
                                This is my frontend technology stack, that I use nearly daily.
                            </p>
                            <div className="code-snippet-wrapper absolute -bottom-16">
                                <Image
                                    src={"/media/most-used-tech-cover.svg"}
                                    width={"500"}
                                    height={"200"}
                                    alt="code-snippet"
                                    priority
                                />
                            </div>
                        </ExperienceBox>
                    </div>
                    <ExperienceBox className="relative">
                        <div>
                            <h3 className="leading-snug text-white font-normal text-3xl font-general">
                                Building a space for people who love <br /> engineering and design.
                            </h3>
                            <p className="text-zinc-500 text-lg mt-6 leading-8">
                                community, seasonal.
                            </p>
                            <ComicButton className="mt-12">
                                {"Visit Website"}
                            </ComicButton>
                        </div>
                        <div className="code-snippet-wrapper absolute -bottom-12 -right-24">
                            <Image
                                src={"/media/hekors-website-cover.svg"}
                                width={"600"}
                                height={"200"}
                                alt="code-snippet"
                                priority
                            />
                        </div>
                    </ExperienceBox>
                </div>
            </ViewContainer>
        </section>
    )
};

const ExperienceBox: React.FunctionComponent<ViewContainerPropsType> = ({ children, className, ...experienceBoxHTMLAttributes }) => {
    return (
        <div className={`experience-box-element rounded-md border-2 border-zinc-700 p-6 py-10  w-full overflow-hidden
            transition-all hover:-translate-y-1.5 bg-zinc-900 hover:bg-zinc-800 ${className}`}
            {...experienceBoxHTMLAttributes}>
            <span>{children}</span>
        </div>
    )
};