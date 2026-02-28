'use client';
import { ComponentPreviewContainer } from '@/components/component-preview-container';
import { InternalPostContainer } from '@/components/sections/internal-post-container';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { useState } from 'react';

const DEFAULT_COUNT: number = 120 as const;

export default function Demo() {
  return (
    <InternalPostContainer>
      <ComponentPreviewContainer className="h-[560px] flex items-center justify-center">
        <Preview />
      </ComponentPreviewContainer>
    </InternalPostContainer>
  );
}

type WaveType = 'sin' | 'cos' | 'tan';
type AnimationType = 'spring' | 'keyframes';

const getWaveAmplitude = (
  waveType: WaveType,
  amplitude: number,
  index: number,
) => {
  let value: number;
  switch (waveType) {
    case 'sin':
      value = Math.sin(index) * amplitude;
      break;
    case 'cos':
      value = Math.cos(index) * amplitude;
      break;
    case 'tan':
      value = Math.tan(index) * amplitude;
      break;
  }
  // Round to avoid hydration mismatch (server/client floating-point precision differences)
  return Math.round(value * 10000) / 10000;
};

function Preview() {
  const [wave, setWave] = useState<WaveType>('sin');
  const [animationType, setAnimationType] =
    useState<AnimationType>('keyframes');

  const handleWaveFormSelect = (form: WaveType) => () => {
    setWave(form);
  };

  const handleWaveAnimationTypeSelect = (type: AnimationType) => () => {
    setAnimationType(type);
  };

  return (
    <div className="w-full h-full flex items-center justify-center relative bg-foreground">
      {Array.from({ length: DEFAULT_COUNT }).map((_, index) => {
        const W = getWaveAmplitude(wave, 20, index);
        return (
          <motion.div
            key={`items-${index * 1.02 + 120}-${wave}-${animationType}`}
            className="bg-background w-3 h-0.5"
            initial={{ y: W }}
            animate={{
              y: -W,
            }}
            transition={{
              repeat: Infinity,
              repeatType: 'mirror',
              type: animationType,
              duration: 1.5,
              bounce: 0,
            }}
          />
        );
      })}
      <div className="absolute z-20 w-full bg-background border-t border-foreground/10 flex items-center justify-center p-2 bottom-0">
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger className="rounded-full p-4 py-2 border border-foreground/10 shadow-2xs text-foreground text-sm font-medium bg-background cursor-pointer">
              Wave Form: <span className="font-serif">{wave}</span>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem
                onSelect={handleWaveFormSelect('sin')}
                className="w-full justify-between flex">
                sin
                {wave === 'sin' && <Check />}
              </DropdownMenuItem>
              <DropdownMenuItem
                onSelect={handleWaveFormSelect('cos')}
                className="w-full justify-between flex">
                cos
                {wave === 'cos' && <Check />}
              </DropdownMenuItem>
              <DropdownMenuItem
                onSelect={handleWaveFormSelect('tan')}
                className="w-full justify-between flex">
                tan
                {wave === 'tan' && <Check />}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger className="rounded-full p-4 py-2 border border-foreground/10 shadow-2xs text-foreground text-sm font-medium bg-background cursor-pointer">
              Animation type: {animationType}
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem
                onSelect={handleWaveAnimationTypeSelect('keyframes')}
                className="w-full justify-between flex">
                keyframes
                {animationType === 'keyframes' && <Check />}
              </DropdownMenuItem>
              <DropdownMenuItem
                onSelect={handleWaveAnimationTypeSelect('spring')}
                className="w-full justify-between flex">
                spring
                {animationType === 'spring' && <Check />}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
}
