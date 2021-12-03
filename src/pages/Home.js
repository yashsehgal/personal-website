import { useState } from 'react';
import Profile from '../assets/profile.jpg';
import ShowwcaseLogo from '../assets/showwcase-logo.svg';

export default function Home() {
    const [eccentricTouchPlugTextRef, setEccentricTouchPlugText] = useState('Eccentric Touch');
    const [hoverAnimationTextFontStyleRef, setHoverAnimationTextFontStyle] = useState('normal');
    return (
        <div className="home">
            <div className="hero-section m-top-14 content-center" style={{
                display: 'flex',
                alignItems: 'flex-start',
                flexDirection: 'row',
                justifyContent: 'space-between'
            }}>
                <div className="tagline-content-section">
                <h1 style={{ fontWeight: '800', fontSize: '52px', lineHeight: '1.8' }}>
                    I know <marquee behavior="scroll" direction="right" scrollamount="12" style={{
                        width: 'fit-content'
                    }}><button className="primary-btn">frontend</button></marquee> stuff 
                    <span style={{ fontWeight: '500' }}>🔥</span> <br />
                    and I <span style={{ fontWeight: '500' }}>💜 </span>
                    to work with <marquee behavior="scroll" direction="left" scrollamount="12" style={{
                        width: 'fit-content'
                    }}><button className="outline-btn">SCSS</button></marquee><br />
                    <span className="color-purple-900"
                        style={{
                            fontStyle: hoverAnimationTextFontStyleRef,
                            cursor: 'pointer'
                        }}
                        onMouseEnter={() => setHoverAnimationTextFontStyle('italic')}
                        onMouseLeave={() => setHoverAnimationTextFontStyle('normal')}
                    >
                        ReactJS
                    </span> and
                    <button className="text-btn m-right-2">Javascript</button>Also, <br />
                    I little bit of <button className="outline-btn outline-btn__success">VueJS</button>
                </h1>
                <h4 className="m-top-3">And, I also love to use 
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
                <div className="cta-buttons-section" style={{
                    display: 'flex',
                    alignItems: 'flex-end',
                    gap: '1.4em',
                    flexDirection: 'column',
                    justifyContent: 'space-between'
                }}>
                    <button className="primary-btn"
                        onMouseEnter={(currentButton) => {currentButton.target.className="outline-btn"}}
                        onMouseLeave={(currentButton) => {currentButton.target.className="primary-btn"}}
                    >
                        Experience
                    </button>
                    <button className="primary-btn"
                        onMouseEnter={(currentButton) => {currentButton.target.className="outline-btn"}}
                        onMouseLeave={(currentButton) => {currentButton.target.className="primary-btn"}}
                    >
                        Volunteer work
                    </button>
                    <button className="primary-btn"
                        onMouseEnter={(currentButton) => {currentButton.target.className="outline-btn"}}
                        onMouseLeave={(currentButton) => {currentButton.target.className="primary-btn"}}
                    >
                        Skills
                    </button>
                    <button className="primary-btn"
                        onMouseEnter={(currentButton) => {currentButton.target.className="outline-btn"}}
                        onMouseLeave={(currentButton) => {currentButton.target.className="primary-btn"}}
                    >
                        Schedule a meeting
                    </button>
                </div>
            </div>
        </div>
    )
}