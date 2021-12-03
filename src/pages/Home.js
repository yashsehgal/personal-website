import { useState } from 'react';
import Profile from '../assets/profile.jpg';
import ShowwcaseLogo from '../assets/showwcase-logo.svg';

export default function Home() {
    const [eccentricTouchPlugTextRef, setEccentricTouchPlugText] = useState('Eccentric Touch');
    return (
        <div className="home">
            <div className="hero-section m-top-14 content-center">
                <h1 style={{ fontWeight: '800', fontSize: '52px', lineHeight: '1.8' }}>
                    I know <button className="primary-btn">frontend</button> stuff 
                    <span style={{ fontWeight: '500' }}>🔥</span> <br />
                    and I <span style={{ fontWeight: '500' }}>💜 </span>
                    to work with <button className="outline-btn">SCSS</button><br />
                    <span className="color-purple-900">ReactJS</span> and
                    <button className="text-btn m-right-2">Javascript</button>Also, <br />
                    I little bit of <button className="outline-btn outline-btn__success">VueJS</button>
                </h1>
                <h4 className="m-top-3">And, I also don't wait to use 
                    <a href="https://eccentrictouch.thedesignsystems.com" 
                        className="link"
                        target="_blank"
                        rel="noreferrer"
                        onMouseEnter={() => setEccentricTouchPlugText('Eccentric Touch - Check it out please!!')}
                        onMouseLeave={() => setEccentricTouchPlugText('Eccentric Touch')}
                    >
                        {eccentricTouchPlugTextRef}
                    </a> in any project I am working on</h4>
            </div>
        </div>
    )
}