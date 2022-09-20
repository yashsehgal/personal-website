import ResumePDF from '../../lib/resume.pdf';

export default function JobRoleCTA() {
    return (
        <div className="open-for-job-roles-cta-component px-6 py-8 mt-12 bg-gray-50 h-auto w-fit">
            <div className="flex flex-col w-fit h-fit items-start justify-start gap-1.5">
                <h3 className="leading-snug text-base font-semibold text-gray-700">
                    {"Currently open for full-time/internship roles"}
                </h3>
                <p className="leading-snug text-sm font-normal text-gray-400 w-[74ch]">
                    I am open for job opportunities in roles such as Frontend Engineering, UI Engineering, Design Systems, Product Designer and anything that involves React {"💜"}
                </p>
                <div className="flex flex-row items-center justify-start gap-6 mt-2">
                    <a href={ResumePDF}
                        className="text-sm text-blue-500 hover:text-blue-400 cursor-pointer select-none font-normal" target="_blank" rel="noreferrer">Resume</a>
                    <a href="https://yashsehgal.notion.site/yashsehgal-e408313280ad4f9aa5f5cc4b4672540f" 
                    className="text-sm text-blue-500 hover:text-blue-400 cursor-pointer select-none font-normal" target="_blank" rel="noreferrer">Personal Blog on Notion</a>
                </div>
            </div>
        </div>
    )
}