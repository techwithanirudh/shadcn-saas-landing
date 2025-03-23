import { cn } from '@/lib/utils';

const Separator = ({ className }: { className?: string }) => (
  <div className='border-grid border-b'>
    <div className='container-wrapper'>
      <div className={cn('h-8 bg-dashed', className)} />
    </div>
  </div>
);

export default Separator;
