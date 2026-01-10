'use client';

import NumberFlow from '@number-flow/react';
import { ArrowRight, CheckIcon, HelpCircleIcon, MinusIcon } from 'lucide-react';
import Link from 'next/link';
import { Fragment, type ReactNode } from 'react';
import { Section } from '@/components/section';
import { buttonVariants } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import { groups, plans } from '../data';

export const PricingTable = ({
  paymentFrequency,
}: {
  paymentFrequency: string;
}) => {
  return (
    <Section className='flex flex-col gap-8'>
      <Table className='border-collapse'>
        <TableHeader>
          <TableRow className='bg-background hover:bg-background'>
            <TableHead className='bg-card' />
            {plans.map((plan, index) => {
              const price = plan.price[paymentFrequency];

              return (
                <TableHead
                  className={cn(
                    'min-w-[200px] p-6 text-center',
                    index % 2 === 1 &&
                      'border-border border-x border-b border-dashed bg-card'
                  )}
                  key={plan.name}
                >
                  <div className='flex flex-col items-center gap-2 p-2'>
                    <h3 className='font-semibold text-lg'>{plan.name}</h3>
                    {/* <p className='text-muted-foreground text-sm'>
                      {plan.description}
                    </p> */}

                    <div className='-mt-2'>
                      {typeof price === 'number' ? (
                        <div className='flex items-center justify-center gap-1'>
                          <div className='flex items-baseline'>
                            <NumberFlow
                              className='font-semibold text-xs'
                              format={{
                                style: 'currency',
                                currency: 'USD',
                                trailingZeroDisplay: 'stripIfInteger',
                              }}
                              value={price}
                            />
                          </div>
                          <p className='text-muted-foreground text-xs'>
                            {paymentFrequency} per user
                          </p>
                        </div>
                      ) : (
                        <h3 className='font-bold text-xs'>{price}</h3>
                      )}
                    </div>

                    <Link
                      className={cn(
                        buttonVariants({
                          variant: plan?.popular ? 'default' : 'secondary',
                          size: 'sm',
                        }),
                        'group mt-2'
                      )}
                      href={plan.cta.href}
                    >
                      {plan.cta.label}
                      <ArrowRight className='ml-2 h-4 w-4 transition-transform group-hover:-rotate-45' />
                    </Link>
                  </div>
                </TableHead>
              );
            })}
          </TableRow>
        </TableHeader>

        <TableBody>
          {groups.map((group) => (
            <Fragment key={group.name}>
              <TableRow className='bg-card'>
                <TableCell
                  className='p-4 font-medium'
                  colSpan={plans.length + 1}
                >
                  {group.name}
                </TableCell>
              </TableRow>

              {group.features.map((feature) => (
                <TableRow key={feature.label}>
                  <TableCell className='flex items-center gap-2 bg-card p-4 font-medium'>
                    {feature.label}
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <HelpCircleIcon className='h-4 w-4 text-muted-foreground' />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className='max-w-[200px] text-sm'>
                            {feature.description}
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </TableCell>

                  {feature.plans.map((value, index) => {
                    let cellContent: ReactNode;

                    if (typeof value === 'boolean') {
                      cellContent = value ? (
                        <CheckIcon className='mx-auto h-5 w-5 text-success' />
                      ) : (
                        <MinusIcon className='mx-auto h-5 w-5 text-muted-foreground' />
                      );
                    } else {
                      cellContent = <span>{value}</span>;
                    }

                    return (
                      <TableCell
                        className={cn(
                          'text-center',
                          index % 2 === 1 &&
                            'border-border border-x border-t border-dashed bg-card'
                        )}
                        key={`${String(value)}_${index}`}
                      >
                        {cellContent}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))}
            </Fragment>
          ))}
        </TableBody>
      </Table>
    </Section>
  );
};
