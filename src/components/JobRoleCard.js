
export default function JobRoleCard(JobRoleDetails) {
    return (
        <div className="jon-role-card p-top-10 p-bottom-10">
            <h4>{JobRoleDetails.title}</h4>
            <a className="link 
                font-size-14 
                m-top-4 
                m-bottom-2 
                font-weight-600
            " 
                href={JobRoleDetails.website} 
                target="_blank" 
                rel="noreferrer"
            >{JobRoleDetails.company}</a>
            <p className="font-size-14">{JobRoleDetails.startDate} - {JobRoleDetails.endDate} / {JobRoleDetails.jobType}</p>
            <ul style={{ color: '#828282' }} className="m-top-4">
                {JobRoleDetails.description.map((descriptionPoint, index) => (
                    <li className="font-size-14" key={index}>{descriptionPoint}</li>
                ))}
            </ul>
        </div>
    )
}