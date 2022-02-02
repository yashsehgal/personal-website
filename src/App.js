import React, { useState } from 'react';
import ReactTooltip from 'react-tooltip';
import './styles/global.css';

const tags = ["frontend", "ui development", "design system", "product design", "react+scss", "figma", "wittiness"]

export default function App() {
	const [tagsRef] = useState(tags);
	return (
		<React.Fragment>
			<div className="App">
				<div className="header-wrapper" style={{ 
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'space-between'
				}}>
					<div className="title-wrapper">
						<h2>a small redirection to my notion website.</h2>
						<h4>this is <span style={{ color: 'rgb(74, 74, 211)' }}>yash sehgal</span>, btw.</h4>
					</div>
					<div className="header-button-wrapper" style={{ 
						display: 'flex',
						alignItems: 'center',
						gap: '0.8rem'
					}}>
						<button className="btn primary-btn"
							onClick={() => window.open('https://yashsehgal.notion.site/yashsehgal-e408313280ad4f9aa5f5cc4b4672540f')}
						>
							notion portfolio
						</button>
						<button className="btn secondary-btn"
							onClick={() => window.open('https://github.com/yashsehgal')}
						>
							github
						</button>
					</div>
				</div>
				<div style={{ marginTop: '2.4rem', color: '#989898' }}>
					<h3>I work with product designing tools and a decent design system developer.</h3> <br />
					<h3>I am a frontend developer learning product designing, nowadays. I know UX/UI Design, React {"&"} Vue, SCSS.</h3> <br />
					<h3>If you want to hire me for frontend/UI developer, product designing internship roles and then mail me at <br />
						<a href='mailto:yashsehgal.work@gmail.com'>yashsehgal.work@gmail.com</a>
					</h3>
					<div className="tags-wrapper" style={{ 
						marginTop: '2.4rem', 
						display: 'flex',
						flexDirection: 'row',
						alignItems: 'center',
						justifyContent: 'flex-start',
						gap: '0.6rem'
					}}>
						{tagsRef.map((tag, index) => (
							<React.Fragment>
								<span className='tag' key={index} data-tip='' data-for={`tag-tooltip-${tag}`}>#{tag}</span>
								<ReactTooltip id={`tag-tooltip-${tag}`}>in love with {tag}</ReactTooltip>
							</React.Fragment>
						))}
					</div>
				</div>
				<p className='footer-wrapper'
					style={{
						marginTop: '6.4rem',
						color: '#b2b2b2',
						fontSize: '14px'
					}}
				>
					this is just a small page to utilize my domain to redirect you to my notion website.
				</p>
			</div>
		</React.Fragment>
	)
}
