import { useRef } from 'react';
import JobRoleCTA from '../../components/JobRoleCTA';
import WorkExperienceData from '../../dataSource/work-experience.json';

export default function WorkExperience() {
    const workExperienceDataRef = useRef(WorkExperienceData);
    return (
        <section className="work-experience-container">
            <div className="work-experience-content-wrapper mt-20">
                <h1 className="experience-title leading-snug text-2xl font-semibold text-gray-800">Work Experience</h1>
                <div className="work-experience-list-wrapper mt-6">
                    <ul className="work-experience-list flex flex-row items-start justify-start gap-3">
                        {workExperienceDataRef.current?.map((workExperience, workExperienceIndex) => (
                            <li className="work-experience-item"
                                key={workExperienceIndex}
                            >
                                <button className="work-experience-item-content-wrapper bg-transparent hover:bg-gray-100 px-4 hover:scale-105 py-4 transition-all text-left rounded-md cursor-pointer"
                                    onClick={() => window.open(workExperience?.website)}
                                >
                                    <div className="w-fit h-fit flex flex-col items-start justify-start gap-1">
                                        <h3 className="leading-snug text-base font-semibold text-gray-700 w-[32ch]">
                                            {workExperience?.title}
                                        </h3>
                                        <span className="work-experience-company-name-wrapper text-gray-400 font-normal text-sm">
                                            {"at, " + workExperience?.company}
                                        </span>
                                    </div>
                                    <span className="work-experience-duration-wrapper text-gray-400 font-normal text-xs">
                                        {workExperience?.duration?.endData === "current"
                                            ? "currently working here"
                                            : "from, " + workExperience?.duration?.startDate + " to, " + workExperience?.duration?.endData
                                        }
                                    </span>
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