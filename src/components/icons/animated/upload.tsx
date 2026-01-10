'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { ButtonHTMLAttributes } from 'react';
import { forwardRef, useCallback, useImperativeHandle, useRef } from 'react';

import { cn } from '@/lib/utils';

export interface UploadIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface UploadIconProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: number;
}

const ARROW_VARIANTS: Variants = {
  normal: { y: 0 },
  animate: {
    y: -2,
    transition: {
      type: 'spring',
      stiffness: 200,
      damping: 10,
      mass: 1,
    },
  },
};

const UploadIcon = forwardRef<UploadIconHandle, UploadIconProps>(
  (
    {
      onMouseEnter,
      onMouseLeave,
      onFocus,
      onBlur,
      className,
      size = 28,
      ...props
    },
    ref
  ) => {
    const controls = useAnimation();
    const isControlledRef = useRef(false);

    useImperativeHandle(ref, () => {
      isControlledRef.current = true;

      return {
        startAnimation: () => controls.start('animate'),
        stopAnimation: () => controls.start('normal'),
      };
    });

    const handleMouseEnter = useCallback(
      (e: React.MouseEvent<HTMLButtonElement>) => {
        if (isControlledRef.current) {
          onMouseEnter?.(e);
        } else {
          controls.start('animate');
        }
      },
      [controls, onMouseEnter]
    );

    const handleMouseLeave = useCallback(
      (e: React.MouseEvent<HTMLButtonElement>) => {
        if (isControlledRef.current) {
          onMouseLeave?.(e);
        } else {
          controls.start('normal');
        }
      },
      [controls, onMouseLeave]
    );

    const handleFocus = useCallback(
      (event: React.FocusEvent<HTMLButtonElement>) => {
        if (isControlledRef.current) {
          onFocus?.(event);
        } else {
          controls.start('animate');
        }
      },
      [controls, onFocus]
    );

    const handleBlur = useCallback(
      (event: React.FocusEvent<HTMLButtonElement>) => {
        if (isControlledRef.current) {
          onBlur?.(event);
        } else {
          controls.start('normal');
        }
      },
      [controls, onBlur]
    );

    return (
      <button
        aria-label='Animated upload icon'
        className={cn(className)}
        onBlur={handleBlur}
        onFocus={handleFocus}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        type='button'
        {...props}
      >
        <svg
          fill='none'
          height={size}
          stroke='currentColor'
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth='2'
          viewBox='0 0 24 24'
          width={size}
          xmlns='http://www.w3.org/2000/svg'
        >
          <path d='M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4' />
          <motion.g animate={controls} variants={ARROW_VARIANTS}>
            <polyline points='17 8 12 3 7 8' />
            <line x1='12' x2='12' y1='3' y2='15' />
          </motion.g>
        </svg>
      </button>
    );
  }
);

UploadIcon.displayName = 'UploadIcon';

export { UploadIcon };
