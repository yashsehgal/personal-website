import Skeleton from 'react-loading-skeleton';
import ProfileImage from '../../lib/profile.jpg';

export default function Home() {
  return (
    <div className="home page-container flex flex-row items-center justify-center gap-12">
      <div className="profile-image-wrapper w-fit h-fit flex flex-row items-center justify-center">
        {ProfileImage
          ? <img src={ProfileImage} alt="profile" className='w-[360px] h-auto rounded-lg shadow-lg' />
          : <Skeleton height={'480px'} width={'360px'} />
        }
      </div>
      <div className="details-wrapper flex flex-col items-start">
        <div>
          <h1 className='leading-snug font-bold text-6xl text-black'>Yash Sehgal</h1>
          <p className='leading-snug font-normal text-sm tracking-wider text-zinc-400 uppercase ml-2 mt-2'>UI ENGINEER / DESIGN SYSTEMS / OPEN SOURCE</p>
        </div>
        <div className='description text-base text-zinc-500 mt-8 ml-2 flex flex-col items-start w-[320px]'>
          <span>
            In love with <span className="text-black font-semibold underline">design systems</span> as of now.
          </span>
          <span className='mt-3'>
            I work with <span className="underline">React</span>, <span className="underline">Next</span>, <span className="underline">Vue</span> {" "}
            and <span className="underline">Javascript</span> in general.
          </span>
          <span className='mt-8 uppercase text-xs text-zinc-500 tracking-wide'>Recent Updates</span>
          <div className='recent-updates-wrapper mt-2 flex flex-col items-start gap-3'>
            <div className='recent-update-item'>
              <h1 className='recent-update-title font-semibold text-black text-base'>Mentee at {" "}
                <a href="https://github.com/asyncapi/community/discussions/284" rel="noreferrer" target="_blank" className='underline font-bold'>
                  AsyncAPI Initiative's Mentorship Program 2022
                </a>
              </h1>
            </div>
            <div className='recent-update-item'>
              <h1 className='recent-update-title font-semibold text-black text-base'>Written a short blog on {" "}
                <a href="https://www.notion.so/yashsehgal/Getting-started-with-Design-Systems-Engineering-00f9639dd68f4fd79701eb72ca5a1fec"
                  target="_blank"
                  rel="noreferrer"
                  className='underline font-bold'
                >
                  Getting started with Design Systems Engineering
                </a>
              </h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}