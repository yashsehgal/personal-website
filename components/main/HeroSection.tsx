import Section from "../layout/Section";
import Callout from "./Callout";

const HeroSection: React.FunctionComponent = () => {
    return (
        <main className="hero-section" id="hero">
            <Section>
                <h1 className="welcome-text leading-snug font-semibold text-2xl text-gray-900">{"👋 Hi, I am Yash"}</h1>
                <div className="leading-snug font-normal text-base text-gray-500 mt-2">
                    <p>{"A half frontend software engineer, half designer from India."}</p>
                    <p>{(20 + (new Date().getFullYear() - 2023)) + ", he/him"}</p>
                </div>
            </Section>
            <Section>
                <h2 className="about-us-heading leading-snug font-medium text-base text-gray-900">{"about."}</h2>
                <Callout>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Esse blanditiis recusandae totam dolorum sunt expedita! Tempora iste maiores dolores ipsum?
                </Callout>
            </Section>
        </main>
    )
};

export default HeroSection;