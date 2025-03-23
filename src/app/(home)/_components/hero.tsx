import { baseOptions, linkItems } from '@/app/layout.config';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { getLinks } from 'fumadocs-ui/layouts/shared';
import { ArrowUpRight, Code } from 'lucide-react';
import Link from 'next/link';

export default function HeroSection() {
  const links = getLinks(linkItems, baseOptions.githubUrl);
  const navItems = links.filter((item) =>
    ['nav', 'all'].includes(item.on ?? 'all'),
  );

  return (
    <section className='border-grid border-b'>
      <div className='container-wrapper'>
        <div className='container relative overflow-hidden bg-dashed py-20 px-6 sm:py-32'>
          <div className='relative z-10 mx-auto max-w-4xl text-center'>
            <div className='flex items-center justify-center space-x-2 mb-6'>
              <Code className='h-6 w-6 text-primary' />
              <span className='text-sm font-medium text-muted-foreground'>
                Full-Stack Developer & Tech Writer
              </span>
            </div>

            <h1 className='mb-6 text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl'>
              I'm John Doe, a Full-Stack Developer.
            </h1>

            <p className='mx-auto mb-10 max-w-2xl text-lg text-muted-foreground'>
              I write about web development, software engineering, and the
              latest technologies. Join me as I share insights, tutorials, and
              thoughts on building modern applications.
            </p>

            <div className='flex flex-wrap items-center justify-center gap-4'>
              <Link
                className={cn(
                  buttonVariants({
                    variant: 'default',
                    size: 'lg',
                  }),
                  'rounded-full bg-primary hover:bg-primary/90 group',
                )}
                href='/posts'
              >
                Browse Posts
                <ArrowUpRight className='ml-2 size-5 transition-transform group-hover:-rotate-12' />
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
          </div>
        </div>
      </div>
    </section>
  );
}
