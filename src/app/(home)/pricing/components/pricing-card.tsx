'use client';

import NumberFlow from '@number-flow/react';
import { ArrowRight, CheckIcon } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import type { PricingTier } from '../data';

interface PricingCardProps {
  tier: PricingTier;
  paymentFrequency: string;
}

export function PricingCard({ tier, paymentFrequency }: PricingCardProps) {
  const price = tier.price[paymentFrequency];
  const isPopular = tier.popular;
  const isHighlighted = tier.highlighted;

  return (
    <div
      className={cn(
        'relative flex flex-col gap-8 overflow-hidden py-6',
        'bg-card text-foreground',
        'min-h-[600px]',
      )}
    >
      <div
        className={cn(
          'flex flex-col gap-4 border-border border-b border-dashed px-6 pb-6',
        )}
      >
        <h2 className='flex items-center gap-3 font-medium text-xl capitalize'>
          {tier.name}
          {isPopular && (
            <Badge variant='secondary' className='z-10 mt-1'>
              🔥 Most Popular
            </Badge>
          )}
        </h2>

        <div className='relative h-12'>
          {typeof price === 'number' ? (
            <>
              <NumberFlow
                format={{
                  style: 'currency',
                  currency: 'USD',
                  trailingZeroDisplay: 'stripIfInteger',
                }}
                value={price}
                className='font-medium text-4xl'
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
          {tier.features.map((feature, index) => (
            <li
              key={feature}
              className={cn('flex items-center gap-2 text-base')}
            >
              <div className='inline-flex size-5 items-center justify-center rounded-full border border-border p-1 transition-transform hover:scale-125 bg-primary'>
                <CheckIcon
                  className='size-3 text-background'
                  strokeWidth='4'
                />
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
            'group w-full',
          )}
          href={tier.cta.href}
        >
          {tier.cta.label}
          <ArrowRight className='group-hover:-rotate-45 ml-2 h-4 w-4 transition-transform' />
        </Link>
      </div>
    </div>
  );
}
