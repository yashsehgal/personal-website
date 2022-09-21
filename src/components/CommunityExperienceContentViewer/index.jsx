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
                            alt="community-experience-banner" />
                        : <div className="temporary-community-experience-banner rounded flex flex-row items-center justify-center w-[420px] h-[200px] bg-gray-900 text-white">
                            <span className="font-semibold text-lg">
                                {"Community Experience at " + contentProps?.description?.organization}
                            </span>
                        </div>
                    }
                    <h1 className="community-experience-item-title leading-snug text-gray-800 font-semibold text-lg mt-2">
                        {contentProps?.title}
                    </h1>
                    <span className="community-experience-description text-gray-400 flex flex-col items-start justify-start gap-1.5">
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
                </div>
            </button>
            <ReactModal isOpen={communityExperienceContentModal}
                onRequestClose={() => setCommunityExperienceContentModal(false)}
            >
                <div className="close-button-layer">
                    <button className="close-button text-sm text-gray-500 font-normal hover:text-600"
                        onClick={() => setCommunityExperienceContentModal(false)}
                    >{"Close"}</button>
                </div>
                <section className="community-experience-content-viewer-wrapper mt-12">
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
                    <div className="community-experience-content-innerContent-wrapper mt-12 flex flex-col items-start justify-start gap-3">
                        {contentProps?.content?.map((contentItem, contentIndex) => {
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
                        })}
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
                                        {referenceLink?.name + " @ " + referenceLink?.url}
                                    </a>
                                </li>
                            ))}
                        </ul>
                        : <span className="text-sm font-normal text-gray-400">No reference links</span>
                        }
                    </div>
                </section>
            </ReactModal>
        </React.Fragment>
    )
}