import { useRef } from 'react';
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
                <div className="open-for-job-roles-cta-component px-6 py-8 mt-12 bg-gray-50">
                    <div className="flex flex-col w-fit h-fit items-start justify-start gap-1.5">
                        <h3 className="leading-snug text-base font-semibold text-gray-700">
                            {"Currently open for full-time/internship roles"}
                        </h3>
                        <p className="leading-snug text-sm font-normal text-gray-400 w-[74ch]">
                            I am open for job opportunities in roles such as Frontend Engineering, UI Engineering, Design Systems, Product Designer and anything that involves React {"💜"}
                        </p>
                        <div className="flex flex-row items-center justify-start gap-6 mt-2">
                            <a href='#'
                                className="text-sm text-blue-500 hover:text-blue-400 cursor-pointer select-none font-normal" target="_blank" rel="noreferrer">Resume</a>
                            <a href="https://yashsehgal.notion.site/yashsehgal-e408313280ad4f9aa5f5cc4b4672540f" 
                            className="text-sm text-blue-500 hover:text-blue-400 cursor-pointer select-none font-normal" target="_blank" rel="noreferrer">Personal Blog on Notion</a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}