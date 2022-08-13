import { Link } from "react-router-dom";

export default function Header() {
  const headerOptions = [
    { title: "Blogs", path: '/blogs' },
    { title: "Work", path: '/work' },
    { title: "Artwork", path: '/artwork' },
    { title: "Notion", path: '/notion' },
  ]
  return (
    <div className="header my-6 mb-8 flex flex-row items-center justify-between">
      <span className="home-link font-normal text-base text-zinc-900 hover:underline hover:underline-offset-1">
        <Link to="/">
          <span className="home-text">Home</span>
        </Link>
      </span>
      <div className="header-options-wrapper flex flex-row items-center justify-end gap-3">
        {headerOptions?.map((headerOption, headerOptionIndex) => (
          <span className="header-option-item font-normal text-base text-zinc-900 hover:underline hover:underline-offset-1" key={headerOptionIndex}>
            <Link to={headerOption?.path}>
              {headerOption?.title}
            </Link>
          </span>
        ))}
      </div>
    </div>
  )
}