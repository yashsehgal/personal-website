import { useRef } from "react"
import JobRoleCTA from "../../components/JobRoleCTA";
import SkillsData from "../../dataSource/skills.json"

export default function Skills() {
    const skillsDataRef = useRef(SkillsData);

    return (
        <section className="skills-container">
            <div className="skills-content-wrapper mt-20">
                <h1 className="skills-title leading-snug text-2xl font-semibold text-gray-800">
                    {"Things I work with"}
                </h1>
                <div className="skills-list-wrapper mt-12">
                    <ul className="skills-list grid gap-12">
                        {skillsDataRef.current?.map((skillItem, skillIndex) => (
                            <li className="skill-item"
                                key={skillIndex}
                            >
                                <div className="skill-item-content-wrapper">
                                    <h3 className="skill-type-title text-base text-gray-400">{skillItem?.title}</h3>
                                    <div className="skill-category-tags-layer-wrapper mt-3">
                                        <ul className="skill-category-tags-list flex gap-2 w-fit h-auto items-center justify-start">
                                            {skillItem?.skillTags?.map((skillTag, skillTagIndex) => (
                                                <li className="skill-tag-item text-sm text-gray-500"
                                                    key={skillTagIndex}
                                                >
                                                    <span className="skill-tag-item-name-wrapper">
                                                        {skillTagIndex === skillItem?.skillTags?.length - 1
                                                            ? skillTag?.name
                                                            : skillTag?.name + ", "
                                                        }
                                                    </span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <JobRoleCTA />
        </section>
    )
}