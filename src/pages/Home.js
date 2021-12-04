import { useState } from 'react';
import Profile from '../assets/profile.jpg';
import SocialButtonsAnimated from '../components/SocialButtonsAnimated';

const socialButtonsDetails = [
    {
        "title": "Twitter",
        "icon": "fab fa-twitter",
        "username": "yashsehgaldev"
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
            <div className="home-content content-center">
                <div className="hero-section m-right-64 m-left-64 m-top-20">
                    <h1 className="font-size-42 font-weight-900">Hey, I am Yash <span className="font-weight-500">👋</span></h1>
                    <button className="primary-btn m-top-6">
                        Contact Me
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
            </div>
        </div>
    )
}