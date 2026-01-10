import { PlusIcon } from 'lucide-react';
import type { HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

type SectionProps = {
  sectionClassName?: string;
} & HTMLAttributes<HTMLDivElement>;

const Cross = () => (
  <div className='relative h-6 w-6'>
    <div className='absolute left-3 h-6 w-px bg-background' />
    <div className='absolute top-3 h-px w-6 bg-background' />

    <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
      <PlusIcon className='text-border/70 dark:text-border' size={20} />
    </div>
  </div>
);

export const Section = ({
  children,
  sectionClassName,
  className,
  ...props
}: SectionProps) => (
  <section className={sectionClassName} {...props}>
    <div className='container relative mx-auto'>
      <div className={cn('border-border border-dashed sm:border-x', className)}>
        {children}
      </div>
      <div className='absolute -bottom-3 -left-3 z-10 hidden h-6 sm:block'>
        <Cross />
      </div>
      <div className='absolute -right-3 -bottom-3 z-10 hidden h-6 -translate-x-px sm:block'>
        <Cross />
      </div>
    </div>
  </section>
);
