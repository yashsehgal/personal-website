import { useState } from "react"
import { Link } from "react-router-dom";
import { saveCurrentTheme } from "../utils/LocalStorageHelpers";

const HeaderOptions = [
    {
        "title": "Home",
        "path": "/"
    },
    {
        "title": "Projects",
        "path": "/projects",
    },
    {
        "title": "Services",
        "path": "/services"
    }
]

export default function Header(PageThemeProperties) {
    const [headerOptionsRef] = useState(HeaderOptions);
    const [themeSwitcherButtonIconRef, setThemeSwitcherButtonIcon] = useState('far fa-sun');
    return (
        <div className="header p-2 content-center">
            <div className="header-options-wrapper">
                {headerOptionsRef.map((option, index) => (
                    <Link to={option.path} key={index} className="link">
                        <p>{option.title}</p>
                    </Link>
                ))}
                <button className="outline-btn" onClick={() => {
                    if (PageThemeProperties.pageTheme === 'light') {
                        PageThemeProperties.pageThemeMethod('dark');
                        setThemeSwitcherButtonIcon('far fa-moon');
                        saveCurrentTheme('dark')
                    } else {
                        PageThemeProperties.pageThemeMethod('light');
                        setThemeSwitcherButtonIcon('far fa-sun');
                        saveCurrentTheme('light');
                    }
                }}>
                    <i className={themeSwitcherButtonIconRef} />
                </button>
                <button className="primary-btn">Contact Me</button>
            </div>
        </div>
    )
}