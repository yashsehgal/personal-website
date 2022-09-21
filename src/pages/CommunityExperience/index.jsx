import { useRef } from 'react';
import CommunityExperienceContentViewer from '../../components/CommunityExperienceContentViewer';
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
                                <CommunityExperienceContentViewer 
                                    contentProps={communityExperience}
                                />
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <JobRoleCTA />
        </section>
    )
}