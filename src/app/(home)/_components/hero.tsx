import { baseOptions, linkItems } from '@/app/layout.config';
import { buttonVariants } from '@/components/ui/button';
import { Icons } from '@/components/ui/icons';
import { cn } from '@/lib/utils';
import { getLinks } from 'fumadocs-ui/layouts/shared';
import Link from 'next/link';

export default function HeroSection() {
  const links = getLinks(linkItems, baseOptions.githubUrl);
  const navItems = links.filter((item) =>
    ['nav', 'all'].includes(item.on ?? 'all'),
  );

  return (
    <section className='border-grid border-b'>
      <div className='container-wrapper'>
        <div className='container relative overflow-hidden bg-dashed px-6 py-20 sm:py-32'>
          <div className='relative z-10 mx-auto max-w-4xl text-center'>
            <div className='mb-6 flex items-center justify-center space-x-2'>
              <Icons.code className='h-6 w-6 text-primary' />
              <span className='font-medium text-muted-foreground text-sm'>
                Full-Stack Developer & Tech Writer
              </span>
            </div>

            <h1 className='mb-6 font-bold text-4xl text-foreground tracking-tight sm:text-5xl md:text-6xl'>
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
          </div>
        </div>
      </div>
    </section>
  );
}
