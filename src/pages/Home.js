import { useState } from 'react';
import SocialButtonsAnimated from '../components/SocialButtonsAnimated';
import ExperienceSection from './sections/ExperienceSection';

const socialButtonsDetails = [
    {
        "title": "Twitter",
        "icon": "fab fa-twitter",
        "username": "yashsehgaldev",
        "url": "https://www.twitter.com/yashsehgaldev"
    },
    {
        "title": "GitHub",
        "icon": "fab fa-github",
        "username": "yashsehgal",
        "url": "https://www.github.com/yashsehgal"
    },
    {
        "title": "Showwcase",
        "icon": "showwcase-logo",
        "username": "yashsehgal",
        "url": "https://showwcase.com/yashsehgal"
    },
    {
        "title": "Instagram",
        "icon": "fab fa-instagram",
        "username": "sehgalyash_",
        "url": "https://instagram.com/sehgalyash_"
    },
    {
        "title": "LinkedIn",
        "icon": "fab fa-linkedin",
        "username": "Yash Sehgal",
        "url": "https://linkedin.com/in/sehgalyash/"
    }
]

export default function Home() {
    const [socialButtons] = useState(socialButtonsDetails);
    return (
        <div className="home">
            <div className="home-content content-center m-top-20">
                <div className="hero-section m-bottom-24">
                    <h1 className="font-size-42 font-weight-900">Hey, I am Yash <span className="font-weight-500">👋</span></h1>
                    <button className="primary-btn m-top-6"
                        onClick={() => window.open('https://calendly.com/yashsehgal/15min')}
                    >
                        Schedule a meeting
                    </button>
                    <div className="m-left-8 d-inline-flex gap-6">
                        {socialButtons.map((option, index) => {
                            if (option.icon === "showwcase-logo") {
                                return (
                                    <SocialButtonsAnimated iconType="img" key={index}
                                        title={option.title}
                                        url={option.url}
                                        username={option.username}
                                    />
                                )
                            } else {
                                return (
                                    <SocialButtonsAnimated iconType="icon" icon={option.icon} key={index} 
                                        title={option.title}
                                        url={option.url}
                                        username={option.username}
                                    />
                                )
                            }
                        })}
                    </div>
                </div>
                <ExperienceSection />
            </div>
        </div>
    )
}