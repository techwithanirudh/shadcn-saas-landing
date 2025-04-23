import { Section } from '@/components/section';
import Image from 'next/image';
import Balancer from 'react-wrap-balancer';

const Hero = () => (
  <Section className='relative w-full overflow-hidden px-4 py-16 sm:px-16 sm:py-24 md:py-32'>
    <div className='mx-auto flex flex-col items-center justify-center gap-8'>
      <div className='flex flex-col items-center gap-6 text-center'>
        <Image
          src={'/icon.png'}
          alt='Hero Background'
          height={200}
          width={200}
          priority
          className='transition-transform hover:scale-110'
        />
        <h1 className='max-w-2xl bg-gradient-to-b bg-opacity-50 from-foreground to-muted-foreground/70 bg-clip-text font-regular text-4xl text-transparent tracking-tighter sm:text-6xl md:text-7xl'>
          <Balancer>Building the modern BizOps platform</Balancer>
        </h1>
        <p className='mx-auto max-w-2xl text-lg text-muted-foreground/90 md:text-xl'>
          <Balancer>
            Technology has come a long way, and we're here to revolutionize how
            businesses operate.
          </Balancer>
        </p>
      </div>
    </div>
  </Section>
);

export default Hero;
