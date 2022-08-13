
export default function Work() {
  const workData = [
    {
      title: 'Product Design Contributor (Mentee at AsyncAPI Mentorship Program 2022)',
      company: {
        name: 'AsyncAPI Initiative',
        website: 'https://asyncapi.com'
      },
      duration: {
        startDate: 'Jan 2022',
        endDate: 'current'
      }
    },
    {
      title: 'Frontend SDE (Intern)',
      company: {
        name: 'economize.cloud',
        website: 'https://www.economize.cloud'
      },
      duration: {
        startDate: 'Aug 2021',
        endDate: 'Dec 2021'
      }
    }
  ]
  return (
    <div className="work page-container mt-8">
      <h1 className="leading-snug text-2xl font-bold">Work</h1>
      <div className="work-content-wrapper mt-6 grid items-start justify-start gap-4">
        {workData?.map((work, workIndex) => (
          <div className="work-item w-full h-fit"
            key={workIndex}
          >
            <h3 className="leading-snug text-lg font-semibold text-black">{work?.title}</h3>
            <div className="work-details-section-wrapper mt-1.5 flex flex-row items-center justify-between">
              <a href={work?.company?.website} 
                target="_blank" 
                rel="noreferrer"
                className="company-name text-sm text-zinc-600 hover:underline"
              >
                {work?.company?.name}
              </a>
              <span className="text-xs font-normal text-zinc-500 flex flex-row items-center justify-end gap-1 w-fit h-fit">
                <span className="start-date-wrapper">{work?.duration?.startDate}</span>
                <span className="duration-date-divider">{"-"}</span>
                <span className="end-date-wrapper">{work?.duration?.endDate}</span>
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}