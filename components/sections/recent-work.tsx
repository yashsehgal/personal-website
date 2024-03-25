"use client";
import { cn } from "@/lib/utils";
import { ResponsiveControl } from "../layouts/responsive-control";
import { SectionContainer } from "../layouts/section-container";
import Link from "next/link";
import { RecentWorkData } from "./data/recent-work-data";
import { motion} from "framer-motion";
import { IconArrowRight } from "@tabler/icons-react";

export type RecentWorkItemType = {
  headline: string;
  description: string;
  link: string;
}

interface RecentWorkItemProps 
  extends React.HTMLAttributes<HTMLDivElement>, 
  RecentWorkItemType {}

export default function RecentWorks() {
  return <SectionContainer id="recent-works">
    <ResponsiveControl>
      <h2 className="leading-snug tracking-tight font-medium">
        {"Recent work"}
      </h2>
      <div className="mt-6 recent-work-items-container grid gap-6">
        {RecentWorkData.map((item: RecentWorkItemType, threshold: number) => {
          return <motion.div initial={{ opacity: 0, y: 24 * (threshold+1) }} animate={{ opacity: 1, y: 0 }}>
            <RecentWorkItem {...item} />
          </motion.div>
        })}
      </div>
    </ResponsiveControl>
  </SectionContainer>
}

function RecentWorkItem({className, headline, description, children: _, link, ...args}: RecentWorkItemProps) {
  return <div className={cn("recent-work-item", className)} {...args}>
    <Link href={link} className="leading-snug flex items-center w-fit" target="_blank">{headline}{" "} <IconArrowRight className="text-gray-400 -rotate-45 w-4 h-auto" /></Link>
    <p className="mt-1.5 text-sm tracking-tight text-gray-400 w-[22ch]">{description}</p>
  </div>
}