import ProfileImage from '../../lib/profile.jpg';

export default function Home() {
  return (
    <div className="home page-container flex flex-row items-start justify-center gap-8">
      <div className="profile-image-wrapper w-fit h-fit flex flex-row items-center justify-center">
        <img src={ProfileImage} alt="profile" className='w-[360px] h-auto rounded-lg shadow-lg' />
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
        </div>
      </div>
    </div>
  )
}