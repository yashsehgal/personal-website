import { useState } from "react"
import { Link } from "react-router-dom";
import { saveCurrentTheme } from "../utils/LocalStorageHelpers";
import ReactModal from "react-modal";

ReactModal.setAppElement('#root');
const HeaderOptions = [
    {
        "title": "Home",
        "path": "/"
    },
    {
        "title": "About",
        "path": "/about"
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
        <div className="header p-top-12 p-bottom-12 shadow">
            <div className="header-options-wrapper content-center">
                {headerOptionsRef.map((option, index) => (
                    <Link to={option.path} key={index} className="link">
                        <p>{option.title}</p>
                    </Link>
                ))}
                <button className="outline-btn" onClick={() => {
                    if (PageThemeProperties.pageTheme === 'light') {
                        PageThemeProperties.pageThemeMethod('dark');
                        setThemeSwitcherButtonIcon('far fa-moon');
                        saveCurrentTheme('dark');
                    } else {
                        PageThemeProperties.pageThemeMethod('light');
                        setThemeSwitcherButtonIcon('far fa-sun');
                        saveCurrentTheme('light');
                    }
                }}>
                    <i className={themeSwitcherButtonIconRef} />
                </button>
            </div>
        </div>
    )
}