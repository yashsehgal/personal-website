import { useState } from 'react';
import ReactTooltip from 'react-tooltip';
import ShowwcaseLogo from '../assets/showwcase-logo.svg';

export default function SocialButtonsAnimated(ButtonProperties) {
    if (ButtonProperties.iconType==='img') {
        return (
            <button className="primary-btn bg-neutral-gray-900" style={{ transition: 'all 0.2s ease-in-out' }}
                data-tip data-for={ButtonProperties.title.toLowerCase()}
                onClick={() => window.open(ButtonProperties.url)}
            >
                <img src={ShowwcaseLogo} />
                <ReactTooltip id={ButtonProperties.title.toLowerCase()} place="bottom" effect="solid">
                    Connect with me on {ButtonProperties.title} - @{ButtonProperties.username}
                </ReactTooltip>
            </button>
        )
    } else {
        return (
            <button className="primary-btn bg-neutral-gray-900" style={{ transition: 'all 0.2s ease-in-out' }}
                data-tip data-for={ButtonProperties.title.toLowerCase()}
                onClick={() => window.open(ButtonProperties.url)}
            >
                <i className={ButtonProperties.icon} />
                <ReactTooltip id={ButtonProperties.title.toLowerCase()} place="bottom" effect="solid">
                    Connect with me on {ButtonProperties.title} - @{ButtonProperties.username}
                </ReactTooltip>
            </button>
        )
    }
}