import { useState } from "react"
import { Link } from "react-router-dom";

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
        <div className="header p-2">
            <div className="header-options-wrapper">
                {headerOptionsRef.map((option, index) => (
                    <Link to={option.path} key={index}>
                        <button className="text-btn">{option.title}</button>
                    </Link>
                ))}
                <button className="outline-btn" onClick={() => {
                    if (PageThemeProperties.pageTheme === 'light') {
                        PageThemeProperties.pageThemeMethod('dark');
                        setThemeSwitcherButtonIcon('far fa-moon');
                    } else {
                        PageThemeProperties.pageThemeMethod('light');
                        setThemeSwitcherButtonIcon('far fa-sun')
                    }
                }}>
                    <i className={themeSwitcherButtonIconRef} />
                </button>
                <button className="primary-btn"></button>
            </div>
        </div>
    )
}