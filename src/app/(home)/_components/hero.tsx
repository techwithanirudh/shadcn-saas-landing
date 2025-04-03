import { baseOptions, linkItems } from '@/app/layout.config';
import { Icons } from '@/components/icons/icons';
import { Section } from '@/components/section';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { getLinks } from 'fumadocs-ui/layouts/shared';
import Image from 'next/image';
import Link from 'next/link';
import Balancer from 'react-wrap-balancer';
import heroImage from '../../../../public/images/gradient-noise-purple-azure-light.png';

const Hero = () => {
  const links = getLinks(linkItems, baseOptions.githubUrl);
  const navItems = links.filter((item) =>
    ['nav', 'all'].includes(item.on ?? 'all'),
  );

  return (
    <Section className='relative flex flex-col items-center justify-center gap-6 overflow-hidden bg-dashed px-4 py-16 sm:px-16 sm:py-24 md:py-32'>
      <Image
        src={heroImage}
        alt='Hero Background'
        height={600}
        width={704}
        className='pointer-events-none absolute right-0 bottom-0 h-[900px] w-[1004px] max-w-[1004px] translate-x-1/2 translate-y-1/2 select-none opacity-80 dark:opacity-100'
        priority
      />
      <div className='flex items-center justify-center space-x-2'>
        <Icons.code className='h-6 w-6 text-primary transition-transform hover:scale-125' />
        <span className='font-medium text-muted-foreground text-sm'>
          Full-Stack Developer & Tech Writer
        </span>
      </div>
      <h1 className='max-w-3xl text-center font-bold text-4xl leading-tight tracking-tighter sm:text-5xl md:max-w-4xl md:text-6xl lg:leading-[1.1]'>
        <Balancer>I'm John Doe , a Full-Stack Developer.</Balancer>
      </h1>
      <p className='max-w-xl text-center text-muted-foreground md:max-w-2xl md:text-lg'>
        <Balancer>
          I write about web development, software engineering, and the latest
          technologies. I also create fun projects and tutorials to help you
          learn and grow as a developer.
        </Balancer>
      </p>

      <div className='flex flex-wrap items-center justify-center gap-4'>
        <Link
          className={cn(
            buttonVariants({
              variant: 'default',
              size: 'lg',
            }),
            'group rounded-full bg-primary hover:bg-primary/90',
          )}
          href='/posts'
        >
          Browse Posts
          <Icons.arrowUpRight className='group-hover:-rotate-12 ml-2 size-5 transition-transform' />
        </Link>

        <div className='flex items-center space-x-4'>
          {navItems
            .filter((item) => item.type === 'icon')
            .map((item, i) => (
              <Link
                key={i.toString()}
                href={item.url}
                className={cn(
                  buttonVariants({
                    variant: 'ghost',
                    size: 'icon',
                  }),
                  'rounded-full',
                )}
              >
                {item.icon}
                <span className='sr-only'>{item.text}</span>
              </Link>
            ))}
        </div>
      </div>
    </Section>
  );
};

export default Hero;
