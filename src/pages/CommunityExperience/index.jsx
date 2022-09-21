import { useRef } from 'react';
import JobRoleCTA from '../../components/JobRoleCTA';
import CommunityExperienceData from '../../dataSource/community-experience.json';

export default function CommunityExperience() {
    const communityExperienceDataRef = useRef(CommunityExperienceData);
    return (
        <section className="community-experience-container">
            <div className="community-experience-content-wrapper mt-20">
                <h1 className="experience-title leading-snug text-2xl font-semibold text-gray-800">Community Experiences</h1>
                <div className="community-experiences-list-wrapper mt-12">
                    <ul className="community-experience-list grid grid-cols-2 gap-6">
                        {communityExperienceDataRef.current?.map((communityExperience, communityExperienceIndex) => (
                            <li className="community-experience-item" key={communityExperienceIndex}>
                                <button className="community-experience-item-card-button bg-transparent hover:bg-gray-100 px-4 hover:scale-105 py-4  transition-all text-left rounded-md cursor-pointer">
                                    <div className="community-experience-item-content-wrapper flex flex-col items-start justify-start gap-2">
                                        {communityExperience?.coverImage
                                            ? <img src={communityExperience?.coverImage} 
                                                alt="community-experience-banner" />
                                            : <div className="temporary-community-experience-banner rounded flex flex-row items-center justify-center w-[420px] h-[200px] bg-gray-900 text-white">
                                                <span className="font-semibold text-lg">
                                                    {"Community Experience at " + communityExperience?.description?.organization}
                                                </span>
                                            </div>
                                        }
                                        <h1 className="community-experience-item-title leading-snug text-gray-800 font-semibold text-lg mt-2">
                                            {communityExperience?.title}
                                        </h1>
                                        <span className="community-experience-description text-gray-400 flex flex-col items-start justify-start gap-1.5">
                                            <span className="community-experience-organization text-sm">
                                                {"organized by, " + communityExperience?.description?.organization}
                                            </span>
                                            <span className="community-experience-time text-xs">
                                                <span className="at-time-wrapper">{"@"}</span>
                                                <span className="community-experience-time-date">
                                                    {communityExperience?.description?.time?.date}
                                                </span>
                                                <span className="community-experience-time-month">
                                                    {communityExperience?.description?.time?.month}
                                                </span>
                                                <span className="community-experience-time-year">
                                                    {communityExperience?.description?.time?.year}
                                                </span>
                                            </span>
                                        </span>
                                    </div>
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <JobRoleCTA />
        </section>
    )
}