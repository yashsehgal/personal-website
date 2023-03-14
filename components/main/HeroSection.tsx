import { ViewContainer } from "../layout/ViewContainer";
import { ComicButton, OutlineButton } from "../ui/Button";

import { AiOutlineRight } from 'react-icons/ai';

export const HeroSection: React.FunctionComponent = () => {
    return (
        <main className="hero-section">
            <ViewContainer>
                <h1 className="text-8xl font-bold text-center mt-32">
                    A Design to Code.<br />Practioner
                </h1>
                <p className="text-base font-normal text-zinc-400 mt-6 text-center leading-7">
                    Studying Frontend Engineering with a design-first approach.<br />
                    Inspired by many great designers and engineers. And having a passion  <br />
                    for building great products, that people remember.
                </p>
                <div className="flex flex-row items-center justify-center my-6 gap-6">
                    <ComicButton icon={<AiOutlineRight />}
                        onClick={() => window.open("http://cal.com/yashsehgal")}
                    >
                        {"Schedule a meeting"}
                    </ComicButton>
                </div>
            </ViewContainer>
        </main>
    )
};