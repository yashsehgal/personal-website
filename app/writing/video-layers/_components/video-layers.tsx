'use client';
import { cn } from '@/helpers';
import { useState, FocusEvent } from 'react';
import { motion, MotionProps } from 'framer-motion';
import {
  IconGripVertical,
  IconPhoto,
  IconTypography,
} from '@tabler/icons-react';

type LayerVariant = 'text' | 'image';

interface LayerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  length: number;
  name: string;
  variant: LayerVariant;
}

enum LAYER_UI_STATE {
  IDLE = 'IDLE',
  SELECTED = 'SELECTED',
}

const LAYERS_INITIAL_CONFIG: {
  length: number;
  name: string;
  variant: LayerVariant;
}[] = [
  { length: 40, name: 'CTA', variant: 'text' },
  { length: 12, name: 'Logo', variant: 'image' },
  { length: 30, name: 'Headline', variant: 'text' },
  { length: 50, name: 'Main product', variant: 'image' },
  { length: 20, name: 'Description', variant: 'text' },
  { length: 60, name: 'Tagline', variant: 'text' },
  { length: 20, name: 'Terms and condition', variant: 'text' },
] as const;

export function LayersContainer({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>): JSX.Element {
  return (
    <div
      className={cn('LayersContainer grid gap-2 w-[80%] font-sans', className)}
      {...props}>
      {LAYERS_INITIAL_CONFIG.map((layer, index) => {
        return (
          <Layer
            key={index}
            length={layer.length}
            name={layer.name}
            variant={layer.variant}
          />
        );
      })}
    </div>
  );
}

function Layer({
  className,
  length,
  name,
  variant,
  ...props
}: LayerProps): JSX.Element {
  const [LayerUIState, setLayerUIState] = useState<LAYER_UI_STATE>(
    LAYER_UI_STATE.IDLE,
  );

  const handleLayerSelection = (e: FocusEvent<HTMLButtonElement>) => {
    setLayerUIState(LAYER_UI_STATE.SELECTED);
  };

  const handleLayerDeselection = (e: FocusEvent<HTMLButtonElement>) => {
    setLayerUIState(LAYER_UI_STATE.IDLE);
  };

  return (
    <motion.button
      onFocus={handleLayerSelection}
      onBlur={handleLayerDeselection}
      className={cn(
        'Layer h-10 rounded-xl bg-black text-xs text-white flex items-center px-2 select-none transition-all focus-visible:outline-none relative',
        LayerUIState === LAYER_UI_STATE.SELECTED &&
          'border-4 my-6 shadow-md shadow-black/20 rounded-bl-xl rounded-tl rounded-r-none',
        variant === 'image' ? 'border-yellow-400' : 'border-blue-500',
        className,
      )}
      style={{ width: `${length}%` }}
      {...(props as MotionProps)}>
      {LayerUIState === LAYER_UI_STATE.SELECTED && (
        <>
          <motion.span
            className={cn(
              'max-w-[90%] text-xs absolute -top-[16px] -left-1 px-2 truncate rounded-t-md flex items-center gap-1',
              variant === 'image'
                ? 'bg-yellow-400 text-black'
                : 'bg-blue-500 text-white',
            )}>
            {variant === 'image' ? (
              <IconPhoto size={12} className="shrink-0" />
            ) : (
              <IconTypography size={12} className="shrink-0" />
            )}
            <span className="truncate">{name}</span>
          </motion.span>
          <motion.span
            className={cn(
              'h-10 p-0.5 flex items-center justify-center absolute -right-[14px] rounded-r-lg shadow-lg shadow-black/15',
              variant === 'image'
                ? 'bg-yellow-400 text-black'
                : 'bg-blue-500 text-white',
            )}>
            <IconGripVertical size={14} strokeWidth={1.5} />
          </motion.span>
        </>
      )}
      <span className="truncate">{name}</span>
    </motion.button>
  );
}
