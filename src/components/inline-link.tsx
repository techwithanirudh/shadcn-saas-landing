import { cn } from '@/lib/utils';
import Link from 'next/link';
import type { ReactNode } from 'react';

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
      href={href}
      className={cn(
        'text-fd-primary underline hover:text-fd-primary/70 duration-300',
        className,
      )}
      target={blank ? '_blank' : undefined}
    >
      {children}
    </Link>
  );
};
