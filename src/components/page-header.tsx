import { cn } from '@/lib/utils';
import type { ReactNode } from 'react';

const PageHeader = ({
  children,
  className,
}: { children: ReactNode; className?: string }) => (
  <div className='border-grid border-b'>
    <div className='container-wrapper'>
      <div className={cn('container py-6 px-4', className)}>{children}</div>
    </div>
  </div>
);

export default PageHeader;
