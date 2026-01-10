'use client';

import NumberFlow from '@number-flow/react';
import { ArrowRight, CheckIcon } from 'lucide-react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import type { PricingTier } from '../data';

interface PricingCardProps {
  tier: PricingTier;
  paymentFrequency: string;
}

export function PricingCard({ tier, paymentFrequency }: PricingCardProps) {
  const price = tier.price[paymentFrequency];
  const isPopular = tier.popular;
  const _isHighlighted = tier.highlighted;

  return (
    <div
      className={cn(
        'relative flex flex-col gap-8 overflow-hidden py-6',
        'bg-card text-foreground',
        'min-h-[600px]'
      )}
    >
      <div
        className={cn(
          'flex flex-col gap-4 border-border border-b border-dashed px-6 pb-6'
        )}
      >
        <h2 className='flex items-center gap-3 font-medium text-xl capitalize'>
          {tier.name}
          {isPopular && (
            <Badge className='z-10 mt-1' variant='secondary'>
              🔥 Most Popular
            </Badge>
          )}
        </h2>

        <div className='relative h-12'>
          {typeof price === 'number' ? (
            <>
              <NumberFlow
                className='font-medium text-4xl'
                format={{
                  style: 'currency',
                  currency: 'USD',
                  trailingZeroDisplay: 'stripIfInteger',
                }}
                value={price}
              />
              <p className='-mt-2 text-muted-foreground text-xs'>
                {paymentFrequency} per user
              </p>
            </>
          ) : (
            <h1 className='font-medium text-4xl'>{price}</h1>
          )}
        </div>

        <h3 className='font-medium text-sm'>{tier.description}</h3>
      </div>
      <div className='flex-1 space-y-2 px-6'>
        <ul className='space-y-2'>
          {tier.features.map((feature, _index) => (
            <li
              className={cn('flex items-center gap-2 text-base')}
              key={feature}
            >
              <div className='inline-flex size-5 items-center justify-center rounded-full border border-border bg-primary p-1 transition-transform hover:scale-125'>
                <CheckIcon className='size-3 text-background' strokeWidth='4' />
              </div>
              {feature}
            </li>
          ))}
        </ul>
      </div>

      <div className='flex flex-col gap-2 px-6'>
        <Link
          className={cn(
            buttonVariants({
              variant: isPopular ? 'default' : 'secondary',
            }),
            'group w-full'
          )}
          href={tier.cta.href}
        >
          {tier.cta.label}
          <ArrowRight className='ml-2 h-4 w-4 transition-transform group-hover:-rotate-45' />
        </Link>
      </div>
    </div>
  );
}
