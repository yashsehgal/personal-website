import { useRef } from 'react';
import { Link } from 'react-router-dom';
import HeaderOptions from '../../dataSource/header-options.json';
import '../Header/header'

export default function Header() {
    const headerOptionsDataRef = useRef(HeaderOptions);
    return (
        <div className="header-component flex flex-row items-center justify-between py-8">
            <span className="name-logo-wrapper">
                <Link to="/">
                    <span className="name-logo-text font-semibold text-base text-gray-800">yashsehgal</span>
                </Link>
            </span>
            <div className="overlay flex flex-row items-center justify-center absolute bg-gray-200 px-2 rounded-lg -z-10 active:opacity-100 transition-all"></div>
            <span className="header-options-list-wrapper ">
                <ul className="header-options-list flex flex-row items-center justify-end gap-5 w-fit h-auto">
                    {headerOptionsDataRef.current?.map((option, optionIndex) => (
                        <li className="header-option-item text-sm text-gray-500 hover:text-gray-600" 
                            key={optionIndex}
                        >
                            <Link to={option?.path}>
                                {option?.title}
                            </Link>
                        </li>
                    ))}
                    <li className="header-option-item">
                        <button className="px-3 py-1.5 rounded-full bg-gray-800 hover:bg-gray-700 text-sm text-white"
                            onClick={() => window.open('https://github.com/yashsehgal')}
                        >
                            github
                        </button>
                    </li>
                </ul>
            </span>
        </div>
    )
}