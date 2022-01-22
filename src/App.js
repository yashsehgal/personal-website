import React from 'react';
import './styles/global.css';

export default function App() {
	return (
		<React.Fragment>
			<div className="App">
				<div className="introduction-section-wrapper text-align-center
					m-y-auto
				"
					style={{
						display: 'flex',
						flexDirection: 'column',
						gap: '1.2rem',
						alignItems: 'center',
						justifyContent: 'center'
					}}
				>
					<h2>I am Yash Sehgal</h2>
					<p className="p-right-24 p-left-24">
						So, I work a lot with React and SCSS. Javascript is something I breathe daily.
						I have switched my website/blogs to a <span className="font-weight-600 color-purple-900">Notion</span> website because <span className="font-weight-600 color-purple-900 text-decoration-underline">Product Designer</span>.
					</p>
					<button className="primary-btn"
						onClick={() => window.open('https://yashsehgal.notion.site/yashsehgal/yashsehgal-e408313280ad4f9aa5f5cc4b4672540f')}
					>
						Go to my Notion website
					</button>
				</div>
				<div className="
					cta-action-buttons-wrapper 
					text-align-center 
					m-top-16
				"
					style={{
						display: 'flex',
						flexDirection: 'column',
						gap: '1.2rem',
						alignItems: 'center',
						justifyContent: 'center'
					}}
				>
					<h4>Some important plugs I have to add</h4>
					<p className="p-right-24 p-left-24">
						Creator of Eccentric Touch <br /> (This is page is designed through it)
					</p>
					<button className="
						primary-btn
						bg-neutral-gray-100
						neutral-gray-900
					"
						onClick={() => window.open('https://eccentrictouch.thedesignsystems.com/')}
					>
						Check Docs
					</button>
					<button className="
						primary-btn
						bg-color-black
						text-color-white
					">
						Github @yashsehgal
					</button>
					<button className="
						primary-btn
						bg-color-blue-600
						text-color-white
					">
						Twitter @yashsehgaldev
					</button>
				</div>
			</div>
		</React.Fragment>
	)
}
