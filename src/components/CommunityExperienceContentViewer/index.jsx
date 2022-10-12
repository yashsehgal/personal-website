import React, { useState } from "react";
import ReactModal from "react-modal";

export default function CommunityExperienceContentViewer({contentProps}) {
    const [communityExperienceContentModal, setCommunityExperienceContentModal] = useState(false);
    return (
        <React.Fragment>
            <button className="community-experience-item-card-button bg-transparent hover:bg-gray-100 px-4 hover:scale-105 py-4 transition-all text-left rounded-md cursor-pointer"
                onClick={() => {
                    setCommunityExperienceContentModal(true);
                }}
            >
                <div className="community-experience-item-content-wrapper flex flex-col items-start justify-start gap-2">
                    {contentProps?.coverImage
                        ? <img src={contentProps?.coverImage} 
                            alt="community-experience-banner" className="w-[420px] h-auto" />
                        : <div className="temporary-community-experience-banner rounded flex flex-row items-center justify-center w-[420px] h-[200px] text-white bg-gray-900">
                            <span className="font-semibold text-lg">
                                {"Community Experience at " + contentProps?.description?.organization}
                            </span>
                        </div>
                    }
                    <h1 className="community-experience-item-title leading-snug text-gray-800 font-semibold text-lg mt-2">
                        {contentProps?.title}
                    </h1>
                    <span className="community-experience-description text-gray-400 flex flex-col items-start justify-start gap-1.5">
                        {contentProps?.description?.organization
                            ? <span className="community-experience-organization text-sm">
                                {"organized by, " + contentProps?.description?.organization}
                              </span>
                            : <React.Fragment>
                                <span className="text-sm text-gray-300">No organization mentioned</span>
                            </React.Fragment>
                        }
                        <span className="community-experience-time text-xs w-fit h-fit flex flex-row items-center justify-start gap-[1px]">
                            {contentProps?.description?.time
                                ? <React.Fragment>
                                    <span className="at-time-wrapper">{"@"}</span>
                                        <span className="community-experience-time-date">
                                            {contentProps?.description?.time?.date}
                                        </span>
                                        <span className="community-experience-time-month">
                                            {contentProps?.description?.time?.month}
                                        </span>
                                        <span className="community-experience-time-year">
                                            {contentProps?.description?.time?.year}
                                        </span>
                                    </React.Fragment>
                                : <React.Fragment>
                                    <span className="text-gray-300">No time is mentioned</span>
                                </React.Fragment>
                            }
                        </span>
                    </span>
                </div>
            </button>
            <ReactModal isOpen={communityExperienceContentModal}
                onRequestClose={() => setCommunityExperienceContentModal(false)}
                style={{
                    overlay: {
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: 'rgba(0, 0, 0, 0.700)',
                        filter: 'blur(80%)'
                    },
                    content: {
                        background: 'white',
                        borderColor: 'transparent',
                        boxShadow: '0px 0px 6px rgba(0, 0, 0, 0.360)',
                        width: '800px',
                        height: "fit-content",
                        maxHeight: '520px',
                        // centering content (horizontally)
                        marginRight: 'auto',
                        marginLeft: 'auto',
                        marginTop: '4rem'
                    }
                }}
            >
                <div className="close-button-layer">
                    <button className="close-button text-sm text-gray-500 font-normal hover:text-600"
                        onClick={() => setCommunityExperienceContentModal(false)}
                    >{"Close"}</button>
                </div>
                <section className="community-experience-content-viewer-wrapper mt-4">
                    <h1 className="community-experience-content-title leading-snug text-4xl font-semibold text-gray-900">
                        {contentProps?.title}
                    </h1>
                    <span className="community-experience-description text-gray-400 flex flex-row items-center justify-start gap-2">
                        <span className="community-experience-organization text-sm">
                            {"organized by, " + contentProps?.description?.organization}
                        </span>
                        <span className="community-experience-time text-xs">
                            <span className="at-time-wrapper">{"@"}</span>
                            <span className="community-experience-time-date">
                                {contentProps?.description?.time?.date}
                            </span>
                            <span className="community-experience-time-month">
                                {contentProps?.description?.time?.month}
                            </span>
                            <span className="community-experience-time-year">
                                {contentProps?.description?.time?.year}
                            </span>
                        </span>
                    </span>
                    <div className="flex flex-col items-start justify-between">
                    {/* {contentProps?.coverImage 
                        && <img src={contentProps?.coverImage} 
                            alt="community-experience-banner" className="w-[420px] h-auto mt-4" />} */}
                        <div className="community-experience-content-innerContent-wrapper mt-8 flex flex-col items-start justify-start gap-3">
                            {contentProps?.content
                                ? contentProps?.content?.map((contentItem, contentIndex) => {
                                    if (contentItem?.type?.toLowerCase() === "text") {
                                        return (
                                            <p className="innerContent-textContent text-sm text-gray-700" key={contentIndex}>
                                                {contentItem?.textContent}
                                            </p>
                                        )
                                    } else if (contentItem?.type?.toLowerCase() === "img") {
                                        return (
                                            <img src={contentItem?.imageSource} key={contentIndex} 
                                                alt={contentProps?.title + "-img"}
                                            />
                                        )
                                    } else {
                                        return <React.Fragment key={contentIndex}></React.Fragment>
                                    }
                                })

                                : <React.Fragment>
                                    <span className="select-none cursor-default text-base text-gray-400 font-normal">
                                        No content added
                                    </span>
                                </React.Fragment>
                            }
                        </div>
                        <div className="community-experience-content-reference-links-wrapper mt-12">
                            <h4 className="leading-snug text-base font-semibold text-gray-800">{"Reference Links"}</h4>
                            {contentProps?.links
                                ? <ul className="reference-links-list flex flex-col items-start gap-1">
                                {contentProps?.links?.map((referenceLink, referenceLinkIndex) => (
                                    <li className="reference-link-item text-sm" key={referenceLinkIndex}>
                                        <a href={referenceLink?.url} target="_blank" rel="noreferrer"
                                            className="text-blue-400 hover:underline"
                                        >
                                            {referenceLink?.name}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                            : <span className="text-sm font-normal text-gray-400">No reference links</span>
                            }
                        </div>
                    </div>
                </section>
            </ReactModal>
        </React.Fragment>
    )
}