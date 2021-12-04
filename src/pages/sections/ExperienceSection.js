import { useState } from "react";
import JobRoleCard from "../../components/JobRoleCard";

const JobDetails = [
    {
        "title": "SDE-Frontend",
        "job_type": "Internship",
        "startDate": "Aug, 2021",
        "company": "Economize.cloud",
        "endDate": "Current",
        "website": "https://www.economize.cloud",
        "description": [
            "Worked on existing SaaS applications and UI designs and helped to optimize the UI/UX flow.",
            "Used technologies such as Vue. SCSS, JS to improve frontend.",
            "Worked on creating a complete design system for the product using Vue, SCSS/CSS, and Storybook."
        ]
    },
    {
        "title": "founder & CEO",
        "job_type": "Full Time",
        "startDate": "Dec, 2020",
        "company": "The DesignSystems",
        "endDate": "Current",
        "website": "https://www.thedesignsystems.com",
        "description": [
            "Working on a CSS Component Library for Frontend Developers. It has a set of class methods with various ways of implementation.",
            "Writing and updating Documentations every day to keep the development flow on track and easy for the user to understand the tool.",
            "Some beginner-friendly projects such as Showcase your profiles and projects to help people get started with Open Source and make their first valid/valuable contribution."
        ]
    }
]

export default function ExperienceSection() {
    const [jobDetails] = useState(JobDetails);
    return (
        <div className="experience-section">
            <h1>Experience</h1>
            {jobDetails.map((job, index) => (
                <JobRoleCard 
                    key={index}
                    title={job.title}
                    startDate={job.startDate}
                    endDate={job.endDate}
                    company={job.company}
                    website={job.website}
                    jobType={job.job_type}
                    description={job.description}
                />
            ))}
        </div>
    )
}