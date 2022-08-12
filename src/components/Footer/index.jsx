import { Link } from "react-router-dom";
import { FaCompass } from 'react-icons/fa';

export default function Footer() {
  const footerOptions = {
    sitemap: [
      { title: "Home", path: "/" },
      { title: "Blogs", path: "/blogs" },
      { title: "Work", path: "/work" },
      { title: "Notion Portfolio", path: "/notion" }
    ],
    socials: [
      { title: "GitHub", url: "https://github.com/yashsehgal" },
      { title: "Instagram", url: "https://instagram.com/sehgalyash_" },
      { title: "Twitter", url: "https://twitter.com/yashsehgaldev" }
    ]
  };
  return (
    <div className="footer my-6 mt-16 mb-20">
      <div className="links-layer flex flex-row items-center justify-between">
        <div className="footer-sitemap-links-wrapper flex flex-row items-center justify-start gap-4">
          {footerOptions?.sitemap?.map((sitemapLink, sitemapLinkIndex) => (
            <span className="sitemap-link-item font-normal text-base text-zinc-900 hover:underline hover:underline-offset-1"
            key={sitemapLinkIndex}
            >
              <Link to={sitemapLink?.path}>
                {sitemapLink?.title}
              </Link>
            </span>
          ))}
        </div>
        <div className="footer-socials-links-wrapper flex flex-row items-center justify-start gap-4">
            {footerOptions?.socials?.map((socialLink, socialLinkIndex) => (
              <span className="social-link-item font-normal text-base text-zinc-900 hover:underline hover:underline-offset-1"
              key={socialLinkIndex}
              >
                <a href={socialLink?.url} target="_blank" rel="noreferrer">{socialLink?.title}</a>
              </span>
            ))}
        </div>
      </div>
      <div className="contact-location-details-wrapper mt-6 flex flex-row items-center justify-between">
        <span className="flex flex-row items-center justify-start gap-1 w-fit h-fit text-sm text-zinc-600">
          <FaCompass /> {"Currently in Indore"}
        </span>
      </div>
    </div>
  )
}