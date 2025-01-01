'use client';
import { PLATFORM_USAGE_CARD_VIEW } from '@/app/writing/platform-usage-card/_components/interfaces';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { cn } from '@/helpers';
import {
  IconBrandAirbnb,
  IconBrandInstagram,
  IconBrandPinterest,
  IconBrandSlack,
  IconBrandWhatsapp,
  IconBrandX,
} from '@tabler/icons-react';

const AUTO_INTERVAL_DURATION = 2000; // duration of interval

export function PlatformUsageCard(): JSX.Element {
  const [platformUsageCardContent, setPlatformUsageCardContent] = useState<
    PLATFORM_USAGE_CARD_VIEW[]
  >([PLATFORM_USAGE_CARD_VIEW.SHOW_TIME]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setPlatformUsageCardContent((prevContent) => {
        if (prevContent.length === 3) {
          clearInterval(intervalId);
          return prevContent;
        }

        switch (prevContent.length) {
          case 0:
            return [PLATFORM_USAGE_CARD_VIEW.SHOW_TIME];
          case 1:
            return [
              PLATFORM_USAGE_CARD_VIEW.SHOW_TIME,
              PLATFORM_USAGE_CARD_VIEW.SHOW_GRAPH,
            ];
          case 2:
            return [
              PLATFORM_USAGE_CARD_VIEW.SHOW_TIME,
              PLATFORM_USAGE_CARD_VIEW.SHOW_GRAPH,
              PLATFORM_USAGE_CARD_VIEW.SHOW_MOST_USED,
            ];
          default:
            return prevContent;
        }
      });
    }, AUTO_INTERVAL_DURATION);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <AnimatePresence mode="sync">
      <motion.div
        layout
        className="Platform-usage-card-container font-sans p-2 rounded-3xl bg-gray-100 w-[420px] select-none cursor-default">
        <div
          className={cn(
            'Platform-usage-card--time-graph-content-container bg-white p-6 rounded-2xl shadow shadow-gray-200 space-y-6',
            platformUsageCardContent.includes(
              PLATFORM_USAGE_CARD_VIEW.SHOW_GRAPH,
            ) && 'pb-12',
          )}>
          <AnimatePresence mode="wait">
            {platformUsageCardContent.includes(
              PLATFORM_USAGE_CARD_VIEW.SHOW_TIME,
            ) && <PlatformUsageCardTimeContent />}
          </AnimatePresence>
          <AnimatePresence mode="wait">
            {platformUsageCardContent.includes(
              PLATFORM_USAGE_CARD_VIEW.SHOW_GRAPH,
            ) && <PlatformUsageCardGraphContent />}
          </AnimatePresence>
        </div>
        <AnimatePresence mode="wait">
          {platformUsageCardContent.includes(
            PLATFORM_USAGE_CARD_VIEW.SHOW_MOST_USED,
          ) && (
            <motion.div
              className="Platform-usage-card--most-used-container px-4 pt-6 pb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}>
              <PlatformUsageCardMostUsedContent />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </AnimatePresence>
  );
}

function PlatformUsageCardTimeContent(): JSX.Element {
  return (
    <div className="PlatformUsageCardTimeContent-container space-y-1">
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
      className="PlatformUsageCardGraphContent-container flex items-end justify-between border-b border-b-gray-100 px-2"
      initial={{ opacity: 0, y: 12, scale: 0.4 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -12, scale: 0.4 }}
      transition={{ duration: 0.3 }}>
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
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        staggerChildren: 0.05,
        staggerDirection: -1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.8 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 24,
      },
    },
    exit: {
      opacity: 0,
      y: -20,
      scale: 0.8,
      transition: {
        duration: 0.2,
      },
    },
  };

  return (
    <motion.div
      className="grid grid-cols-2 gap-4 overflow-hidden"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      layout>
      {PLATFORMS_USAGE_DATA.map(({ icon: PlatformIcon, name, usage }) => (
        <motion.div
          key={`platform-${name.toLowerCase()}`}
          className="flex items-center gap-4"
          variants={itemVariants}>
          <div className="p-2 rounded-lg bg-white text-black border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
            <PlatformIcon size={20} strokeWidth={1.5} />
          </div>
          <div className="w-full">
            <p className="text-sm font-medium text-gray-900">{name}</p>
            <p className="text-xs text-gray-500 font-medium">{usage}</p>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}
