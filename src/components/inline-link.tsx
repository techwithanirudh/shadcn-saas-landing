import Link from 'next/link';
import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

export const InlineLink = ({
  href,
  children,
  blank = false,
  className,
}: {
  href: string;
  children: ReactNode;
  blank?: boolean;
  className?: string;
}) => {
  return (
    <Link
      className={cn(
        'text-fd-primary underline duration-300 hover:text-fd-primary/70',
        className
      )}
      href={href}
      target={blank ? '_blank' : undefined}
    >
      {children}
    </Link>
  );
};
