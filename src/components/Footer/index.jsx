import { Link } from "react-router-dom";
import { FaCompass, FaGithub, FaInstagram, FaLinkedin, FaTwitter } from 'react-icons/fa';
import { useRef } from "react";

export default function Footer() {
    const socialsDataRef = useRef([
        { icon: <FaGithub />, url: "https://github.com/yashsehgal" },
        { icon: <FaTwitter />, url: "https://twitter.com/yashsehgaldev" },
        { icon: <FaLinkedin />, url: "https://linkedin.com/in/sehgalyash" },
        { icon: <FaInstagram />, url: "https://instagram.com/sehgalyash_" }
    ]);

    return (
        <div className="footer-component mt-32 mb-40 flex flex-row items-center justify-between">
            <div className="logo-component-wrapper">
                <Link to="/">
                    <span className="name-logo-text font-normal text-sm text-gray-500">portfolio of yashsehgal</span>
                </Link>
                <span className="current-location-wrapper flex flex-row items-center justify-start gap-1.5 text-xs text-gray-400">
                    <FaCompass />
                    {"currently in Indore, India"}
                </span>
            </div>
            <div className="socials-wrapper flex flex-row items-center justify-start gap-3 w-fit h-auto">
                <span className='font-semibold text-gray-800 text-sm leading-snug'>{"Socials"}</span>
                <ul className="socials-list flex flex-row items-center justify-start gap-2">
                    {socialsDataRef.current?.map((social, socialIndex) => (
                        <li className="social-item text-gray-400 hover:text-gray-600 text-base" 
                            key={socialIndex}
                        >
                            <a href={social?.url}
                                target="_blank"
                                rel="noreferrer"
                            >
                                {social?.icon}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}