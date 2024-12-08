'use client';
import { cn } from '@/helpers';
import { useState, useRef } from 'react';
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
  darkMode: boolean;
}

interface LayerConfig {
  length: number;
  name: string;
  variant: LayerVariant;
}

enum LAYER_UI_STATE {
  IDLE = 'IDLE',
  SELECTED = 'SELECTED',
}

const LAYERS_INITIAL_CONFIG: LayerConfig[] = [
  { length: 40, name: 'CTA', variant: 'text' },
  { length: 12, name: 'Logo', variant: 'image' },
  { length: 30, name: 'Headline', variant: 'text' },
  { length: 50, name: 'Main product', variant: 'image' },
  { length: 20, name: 'Description', variant: 'text' },
  { length: 60, name: 'Tagline', variant: 'text' },
  { length: 20, name: 'Terms and condition', variant: 'text' },
];

export function LayersContainer({
  className,
  darkMode = false,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { darkMode: boolean }): JSX.Element {
  return (
    <div
      className={cn('LayersContainer grid gap-2 w-[80%] font-sans', className)}
      {...props}>
      {LAYERS_INITIAL_CONFIG.map((layer, index) => (
        <Layer
          key={index}
          darkMode={darkMode}
          length={layer.length}
          name={layer.name}
          variant={layer.variant}
        />
      ))}
    </div>
  );
}

function Layer({
  className,
  length: initialLength,
  darkMode,
  name,
  variant,
  ...props
}: LayerProps): JSX.Element {
  const [LayerUIState, setLayerUIState] = useState<LAYER_UI_STATE>(
    LAYER_UI_STATE.IDLE,
  );
  const [length, setLength] = useState(initialLength);
  const [isDragging, setIsDragging] = useState(false);
  const resizeRef = useRef<HTMLSpanElement>(null);
  const lastValidWidth = useRef(length);

  const handleLayerSelection = () => {
    setLayerUIState(LAYER_UI_STATE.SELECTED);
  };

  const handleLayerDeselection = () => {
    setLayerUIState(LAYER_UI_STATE.IDLE);
  };

  const handleResize = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsDragging(true);

    const startX = e.clientX;
    const startWidth = length;

    const handleMouseMove = (moveEvent: MouseEvent) => {
      const deltaX = moveEvent.clientX - startX;
      const containerWidth = window.innerWidth * 0.4; // Assuming container is 80% of window width
      const deltaPercent = (deltaX / containerWidth) * 100;
      const newLength = Math.max(10, Math.min(100, startWidth + deltaPercent));

      // Only update if the change is significant enough
      if (Math.abs(newLength - lastValidWidth.current) > 0.1) {
        lastValidWidth.current = newLength;
        setLength(newLength);
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (LayerUIState !== LAYER_UI_STATE.SELECTED) return;

    const STEP_SIZE = 2; // Percentage to change per keypress

    switch (e.key) {
      case 'ArrowRight':
        e.preventDefault();
        setLength((prev) => Math.min(100, prev + STEP_SIZE));
        lastValidWidth.current = Math.min(100, length + STEP_SIZE);
        break;
      case 'ArrowLeft':
        e.preventDefault();
        setLength((prev) => Math.max(10, prev - STEP_SIZE));
        lastValidWidth.current = Math.max(10, length - STEP_SIZE);
        break;
    }
  };

  return (
    <motion.button
      drag={isDragging ? false : 'x'}
      dragMomentum={false}
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.1}
      onFocus={handleLayerSelection}
      onBlur={handleLayerDeselection}
      onKeyDown={handleKeyDown}
      className={cn(
        'Layer h-10 rounded-xl text-xs text-white flex items-center px-2 select-none relative focus-visible:outline-none',
        LayerUIState === LAYER_UI_STATE.SELECTED &&
          'border-4 my-4 shadow-md shadow-black/20 rounded-bl-xl rounded-tl rounded-r-none',
        variant === 'image' ? 'border-yellow-400' : 'border-blue-500',
        darkMode ? 'bg-neutral-800' : 'bg-neutral-200/50 text-black',
        className,
      )}
      style={{
        width: `${length}%`,
        transition: isDragging ? 'none' : 'width 0.2s ease-out',
      }}
      {...(props as MotionProps)}>
      {LayerUIState === LAYER_UI_STATE.SELECTED && (
        <>
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={cn(
              'max-w-[90%] min-w-[10%] text-xs absolute -top-[16px] -left-1 px-2 truncate rounded-t-md flex items-center gap-1',
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
            ref={resizeRef}
            onMouseDown={handleResize}
            className={cn(
              'h-10 p-0.5 flex items-center justify-center absolute -right-[14px] rounded-r-lg cursor-ew-resize',
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

export default Layer;
