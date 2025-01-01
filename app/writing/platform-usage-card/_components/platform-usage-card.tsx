'use client';
import {
  IPlatformUsageCardProps,
  PLATFORM_USAGE_CARD_VIEW,
} from '@/app/writing/platform-usage-card/_components/interfaces';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/helpers';
import {
  IconBrandAirbnb,
  IconBrandInstagram,
  IconBrandPinterest,
  IconBrandSlack,
  IconBrandWhatsapp,
  IconBrandX,
  IconBrandXFilled,
} from '@tabler/icons-react';

export function PlatformUsageCard({
  withAutoInterval,
  currentState = PLATFORM_USAGE_CARD_VIEW.SHOW_TIME,
}: IPlatformUsageCardProps): JSX.Element {
  const [platformUsageCardContent, setPlatformUsageCardContent] = useState<
    PLATFORM_USAGE_CARD_VIEW[]
  >([
    PLATFORM_USAGE_CARD_VIEW.SHOW_TIME,
    PLATFORM_USAGE_CARD_VIEW.SHOW_GRAPH,
    PLATFORM_USAGE_CARD_VIEW.SHOW_MOST_USED,
  ]);

  return (
    <div className="Platform-usage-card-container font-sans p-2 rounded-3xl bg-gray-100 w-[420px] select-none cursor-default">
      <div
        className={cn(
          'Platform-usage-card--time-graph-content-container bg-white p-6 rounded-2xl shadow shadow-gray-200 space-y-6',
          PLATFORM_USAGE_CARD_VIEW.SHOW_GRAPH && 'pb-12',
        )}>
        {platformUsageCardContent.includes(
          PLATFORM_USAGE_CARD_VIEW.SHOW_TIME,
        ) && <PlatformUsageCardTimeContent />}
        {platformUsageCardContent.includes(
          PLATFORM_USAGE_CARD_VIEW.SHOW_GRAPH,
        ) && <PlatformUsageCardGraphContent />}
      </div>
      {platformUsageCardContent.includes(
        PLATFORM_USAGE_CARD_VIEW.SHOW_MOST_USED,
      ) && (
        <div className="Platform-usage-card--most-used-container px-4 pt-6 pb-4">
          <PlatformUsageCardMostUsedContent />
        </div>
      )}
    </div>
  );
}

function PlatformUsageCardTimeContent(): JSX.Element {
  return (
    <div
      key="PlatformUsageCardTimeContent"
      className="PlatformUsageCardTimeContent-container space-y-1">
      <p className="text-sm text-gray-500">Average weekly time</p>
      <p className="text-2xl font-medium text-black">32h 24m</p>
    </div>
  );
}

function PlatformUsageCardGraphContent(): JSX.Element {
  const GRAPH_DATA = [
    { name: 'mon', value: 40 },
    { name: 'tue', value: 20 },
    { name: 'wed', value: 30 },
    { name: 'thu', value: 60 },
    { name: 'fri', value: 50 },
    { name: 'sat', value: 24 },
    { name: 'sun', value: 32 },
  ] as const;

  return (
    <motion.div
      key="PlatformUsageCardGraphContent"
      className="PlatformUsageCardGraphContent-container flex items-end justify-between border-b border-b-gray-100 px-2"
      initial={{ opacity: 0, y: 12, scale: 0.4 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}>
      {GRAPH_DATA.map((graph, index) => {
        return (
          <div className="GrahhContent-container relative" key={index}>
            <motion.div
              key={graph.name}
              className="w-8 bg-indigo-600 rounded-t"
              initial={{ height: 0 }}
              animate={{ height: graph.value * 2 }}
              transition={{ delay: 0.025 * index, type: 'spring' }}
            />
            <span className="Graph-week-name absolute -bottom-6 uppercase text-xs text-gray-500 left-1">
              {graph.name}
            </span>
          </div>
        );
      })}
    </motion.div>
  );
}

function PlatformUsageCardMostUsedContent(): JSX.Element {
  const PLATFORMS_USAGE_DATA = [
    { icon: IconBrandX, name: 'X', usage: '12h 16m' },
    { icon: IconBrandInstagram, name: 'Instagram', usage: '10h 52m' },
    { icon: IconBrandWhatsapp, name: 'WhatsApp', usage: '8h 21m' },
    { icon: IconBrandPinterest, name: 'Pinterest', usage: '6h 11m' },
    { icon: IconBrandAirbnb, name: 'Airbnb', usage: '2h 55m' },
    { icon: IconBrandSlack, name: 'Slack', usage: '1h 14m' },
  ] as const;
  return (
    <motion.div
      key="PlatformUsageCardMostUsedContent"
      className="PlatformUsageCardMostUsedContent-container grid grid-cols-2 gap-4"
      initial={{ opacity: 0, y: 12, scale: 0.4 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}>
      {PLATFORMS_USAGE_DATA.map((platform, index) => {
        const PlatformIcon = platform.icon;
        return (
          <motion.div key={index} className="flex items-center gap-4">
            <div className="Platform-icon-wrapper p-2 rounded-lg bg-white text-black w-fit h-fit border border-gray-200">
              <PlatformIcon size={20} />
            </div>
            <div className="w-full">
              <p className="text-sm font-medium">{platform.name}</p>
              <p className="text-xs text-gray-500">{platform.usage}</p>
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
}
