
import ProfilePurple from '../assets/profile-purple.png';

export default function About() {
    return (
        <div className="about">
            <div className="about-content content-center m-top-20">
                <h1 className="font-size-42 font-weight-900">About Me</h1>
                <div className="content-flex-wrapper d-flex" 
                    style={{ 
                        alignItems: 'center',
                        justifyContent: 'space-between' 
                    }}
                >
                    <p className="description text-align-justify m-top-6" style={{ 
                        width: '60ch'
                     }}>
                        <AboutMeDescriptionContent />
                    </p>
                    <img src={ProfilePurple} alt="yashsehgal" 
                        style={{
                            width: '320px'
                        }}
                    />
                </div>
                <button className="primary-btn m-top-6">
                    Schedule a meeting
                </button>
                {/* <button className="support-buy-me-coffee-btn
                    m-left-6
                    primary-btn
                    primary-btn__warning
                ">
                    Support - Buy me a coffee
                </button> */}
            </div>
        </div>
    )
}

function AboutMeDescriptionContent() {
    return (
        `
            I am a developer + designer based in Indore (India). I love to work remotely on technologies
            such as ReactJS, SCSS, Javascript, VueJS. I am able to design and develop UIs for products
            and complex applications and know how to manage large-scale Design Systems and UI Kits.
            I have worked with many websites and web-applications at the frontend level.
            Other than this, I love to teach people how to code, create designs. Mentoring people at hackathons, 
            and contributing to open source projects is something I love to do.
            I am also a Piano lover.
        `
    )
}