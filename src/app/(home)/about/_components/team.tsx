import { BlurImage } from '@/components/blur-image';
import { Section } from '@/components/section';
import { cn } from '@/lib/utils';
import TeamImage from '@/public/images/about/team.png';

const Team = () => {
  return (
    <Section className='relative w-full pt-10'>
      <div className='flex flex-col gap-10'>
        <div className='flex flex-col gap-2 px-6'>
          <h2 className='font-regular text-3xl tracking-tighter md:text-5xl'>
            Our Team
          </h2>
          <p className='text-lg text-muted-foreground leading-relaxed tracking-tight'>
            A fully remote team of 20+ engineers, designers, and product
            managers
          </p>
        </div>

        <div className='flexitems-center relative justify-center border-t border-dashed'>
          <div
            className={cn(
              'absolute inset-0',
              '[background-size:20px_20px]',
              '[background-image:linear-gradient(to_right,#e4e4e7_1px,transparent_1px),linear-gradient(to_bottom,#e4e4e7_1px,transparent_1px)]',
              'dark:[background-image:linear-gradient(to_right,#262626_1px,transparent_1px),linear-gradient(to_bottom,#262626_1px,transparent_1px)]',
            )}
          />
          <div className='pointer-events-none absolute inset-0 flex items-center justify-center bg-background [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]' />

          <div className='relative z-20 flex size-full flex-col items-center justify-center gap-6 py-6'>
            <BlurImage
              src={TeamImage}
              alt='Team Image'
              imageClassName='rounded-xl'
              width={800}
              className='rounded-xl p-6 transition-transform hover:scale-105'
            />
            <p className='text-muted-foreground text-sm'>
              SaasCN founding team, John Doe, Jane Smith, and Alex Johnson
            </p>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default Team;
