import MetaHead from "@/components/seo/MetaHead"

const BlogView: React.FunctionComponent = () => {
    return (
        <>
            <MetaHead 
                title={"Blog | Yash Sehgal"}
                description={"Design and Technical Blogs by Yash Sehgal."}
                embedSource={{
                    twitter: "https://ik.imagekit.io/eawrckp8wfi/portfolio-image-source/seo/blog?updatedAt=1679689643318&tr=w-1200%2Ch-675%2Cfo-auto",
                    linkedin: "https://ik.imagekit.io/eawrckp8wfi/portfolio-image-source/seo/blog?updatedAt=1679689643318&tr=w-1200%2Ch-628%2Cfo-auto",
                    og: "https://ik.imagekit.io/eawrckp8wfi/portfolio-image-source/seo/blog?updatedAt=1679689643318"
                }}
            />
        </>
    )
}

export default BlogView;