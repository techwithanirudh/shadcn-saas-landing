'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { ButtonHTMLAttributes } from 'react';
import { forwardRef, useCallback, useImperativeHandle, useRef } from 'react';

import { cn } from '@/lib/utils';

export interface CheckIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface CheckIconProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: number;
}

const PATH_VARIANTS: Variants = {
  normal: {
    opacity: 1,
    pathLength: 1,
    scale: 1,
    transition: {
      duration: 0.3,
      opacity: { duration: 0.1 },
    },
  },
  animate: {
    opacity: [0, 1],
    pathLength: [0, 1],
    scale: [0.5, 1],
    transition: {
      duration: 0.4,
      opacity: { duration: 0.1 },
    },
  },
};

const CheckIcon = forwardRef<CheckIconHandle, CheckIconProps>(
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
        aria-label='Animated check icon'
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
          <motion.path
            animate={controls}
            d='M4 12 9 17L20 6'
            initial='normal'
            variants={PATH_VARIANTS}
          />
        </svg>
      </button>
    );
  }
);

CheckIcon.displayName = 'CheckIcon';

export { CheckIcon };
