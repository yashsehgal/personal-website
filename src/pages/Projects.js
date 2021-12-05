import { useState } from "react"

const ProjectsDetails = [
    {
        "title": "Taaask / Personal productivity tool",
        "github": "https://www.github.com/Taaask/taaask",
        "tags": ["react", "scss", "eccentric-touch", "javascript"]
    },
    {
        "title": "GitSpace / UI for a workspace application",
        "github": "https://www.github.com/yashsehgal/dashboard-ui",
        "tags": ["react", "scss", "eccentric-touch", "javascript"]
    },
    {
        "title": "Eccentric Touch",
        "github": "https://www.github.com/DesignSystemsOSS/eccentrictouch",
        "tags": ["react", "scss", "eccentric-touch", "docusaurus"]
    },
    {
        "title": "App.clones / A set of clones of various applications",
        "github": "https://www.github.com/Taaask/taaask",
        "tags": ["react", "scss", "javascript", "UI/UX"]
    }
]

export default function Projects() {
    const [projects] = useState(ProjectsDetails);
    return (
        <div className="projects">
            <div className="projects-section content-center m-top-20">
                <h1 className="font-size-42 font-weight-900">Projects, I've worked on</h1>
                <div className="projects-container m-top-18 d-grid grid-cols-3 gap-42">
                    {projects.map((project, index) => (
                        <ProjectCard 
                            title={project.title}
                            github={project.github}
                            tags={project.tags}
                            key={index}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}

function ProjectCard(ProjectData) {
    return (
        <div>
            <h4>{ProjectData.title}</h4>
            <u className="m-top-4 d-block">Technolgies used</u>
            <div className="tags-layer-wrapper d-flex gap-3">
                {ProjectData.tags.map((tag, index) => {
                    if (index === ProjectData.tags.length-1) {
                        return <p key={index}>{tag}</p>
                    } else {
                        return <p key={index}>{tag}, </p>
                    }
                })}
            </div>
            <a className="m-top-4 d-block link" href={ProjectData.github} target="_blank" rel="noreferrer">
                Check on GitHub <i className="fas fa-arrow-right" />
            </a>
        </div>
    )
}