import { useState } from "react"

const ServicesList = [
    "UI Development",
    "ReactJS Development",
    "Design to Code",
    "Hackathon Organizer",
    "Open Source Project Maintainer",
    "Community Mangement (Internship/Junior Roles)",
    "Design Systems Engineering"
]

export default function Services() {
    const [servicesRef] = useState(ServicesList); 
    return (
        <div className="services">
            <div className="services-content content-center m-top-20">
                <h1 className="font-size-42 font-weight-900">
                    Services I am giving <span className="font-weight-500">💻💸</span>
                </h1>
                <p className="description m-top-6">
                    I can provide you the following services, <br />
                    the "Design Systems Engineer" one is my favourite role though
                </p>
                <div className="m-top-6" style={{ 
                    justifyContent: 'space-between' 
                }}>
                    {servicesRef.map((service, index) => (
                        <button className="primary-btn m-right-6 m-bottom-4" key={index}>{service}</button>
                    ))}
                </div>
                <h4 className="m-top-8">Interested in my work! I am currently Open for Intern roles</h4>
                <button className="m-top-4 primary-btn bg-neutral-gray-900">
                    Hire Me 💻💸
                </button>
            </div>
        </div>
    )
}