import { useState } from "react"
import { Link } from "react-router-dom";
import { saveCurrentTheme } from "../utils/LocalStorageHelpers";
import ReactModal from "react-modal";
import ContactForm from './ContactForm';

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
    const [contactFormModalRef, setContactFormModal] = useState(false);
    const [contactFormModalBGColorRef, setContactFormModalBGColor] = useState(getCurrentThemeBGColor(PageThemeProperties.pageTheme));
    const [contactFormModalTextColorRef, setContactFormModalTextColor] = useState(getCurrentThemeTextColor(PageThemeProperties.pageTheme));
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
                        saveCurrentTheme('dark');
                        setContactFormModalBGColor('#202020');
                        setContactFormModalTextColor('white');
                    } else {
                        PageThemeProperties.pageThemeMethod('light');
                        setThemeSwitcherButtonIcon('far fa-sun');
                        saveCurrentTheme('light');
                        setContactFormModalBGColor('bg-color-white');
                        setContactFormModalTextColor('#202020');
                    }
                }}>
                    <i className={themeSwitcherButtonIconRef} />
                </button>
                <button className="primary-btn"
                    onClick={() => {
                        setContactFormModal(true)
                    }}
                >Contact Me</button>
            </div>
            <ReactModal
                isOpen={contactFormModalRef}
                onRequestClose={() => setContactFormModal(false)}
                style={{
                    overlay: {
                        backgroundColor: 'var(--color-purple-900)'
                    },
                    content: {
                        backgroundColor: contactFormModalBGColorRef,
                        border: 'none',
                        boxShadow: '2px 4px 80px 2px var(--neutral-gray-500)',
                        width: '50%',
                        height: 'fit-content',
                        marginRight: 'auto',
                        marginLeft: 'auto',
                        marginTop: 'auto',
                        marginBottom: 'auto'
                    }
                }}
            >
                <ContactForm textColor={contactFormModalTextColorRef} 
                    modalState={setContactFormModal}
                />
            </ReactModal>
        </div>
    )
}

function getCurrentThemeBGColor(themeID) {
    if (themeID === 'light') {
        return 'bg-color-white'
    } else if (themeID === 'dark') {
        return '#202020'
    } else {
        return 'bg-color-white'
    }
}

function getCurrentThemeTextColor(themeID) {
    if (themeID === 'light') {
        return '#202020'
    } else if (themeID === 'dark') {
        return 'white'
    }
}