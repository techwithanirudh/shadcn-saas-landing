'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ArrowRight, CheckIcon, HelpCircleIcon, MinusIcon } from 'lucide-react';
import { Fragment, useState } from 'react';
import { groups, plans } from '../data';
import { Section } from '@/components/section';
import NumberFlow from '@number-flow/react';
import { buttonVariants } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export const PricingTable = ({ paymentFrequency }: { paymentFrequency: string }) => {
  return (
    <Section className="flex flex-col gap-8">
      <Table className="border-collapse">
        <TableHeader>
          <TableRow className="bg-background hover:bg-background">
            <TableHead className="bg-card"></TableHead>
            {plans.map((plan, index) => {
              const price = plan.price[paymentFrequency];

              return (
                <TableHead
                  key={plan.name}
                  className={cn(
                    "text-center p-6 min-w-[200px]",
                    index % 2 === 1
                      && "bg-card",
                    plan?.popular && "border-border border-x border-b border-dashed", 
                  )}
                >
                  <div className="flex flex-col items-center gap-2 p-4">
                    <h3 className="font-semibold text-lg">{plan.name}</h3>
                    <p className="text-sm text-muted-foreground">{plan.description}</p>

                    <div className="my-4">
                      {typeof price === 'number' ? (
                        <div className="flex flex-col items-center">
                          <div className="flex items-baseline">
                            <NumberFlow
                              format={{
                                style: 'currency',
                                currency: 'USD',
                                trailingZeroDisplay: 'stripIfInteger',
                              }}
                              value={price}
                              className='font-bold text-2xl'
                            />
                          </div>
                          <p className='text-muted-foreground text-xs mt-1'>
                            Per month/user
                          </p>
                        </div>
                      ) : (
                        <h3 className='font-bold text-2xl'>{price}</h3>
                      )}
                    </div>

                    <Link
                      className={cn(
                        buttonVariants({
                          variant: plan?.highlighted ? 'secondary' : 'default',
                          size: 'sm'
                        }),
                        'group mt-2',
                      )}
                      href={plan.cta.href}
                    >
                      {plan.cta.label}
                      <ArrowRight className='group-hover:-rotate-45 ml-2 h-4 w-4 transition-transform' />
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
              <TableRow className="bg-muted/50">
                <TableCell
                  colSpan={plans.length + 1}
                  className="font-medium p-4"
                >
                  {group.name}
                </TableCell>
              </TableRow>

              {group.features.map((feature) => (
                <TableRow key={feature.label}>
                  <TableCell className="font-medium flex items-center gap-2 p-4">
                    {feature.label}
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <HelpCircleIcon className="h-4 w-4 text-muted-foreground" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="text-sm max-w-[200px]">
                            {feature.description}
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </TableCell>

                  {feature.plans.map((value, index) => (
                    <TableCell
                      key={index}
                      className={cn(
                        "text-center",
                        plans[index]?.popular && "bg-card border-border border-dashed border-x border-t"
                      )}
                    >
                      {typeof value === 'boolean' ? (
                        value ? (
                          <CheckIcon className="h-5 w-5 text-success mx-auto" />
                        ) : (
                          <MinusIcon className="h-5 w-5 text-muted-foreground mx-auto" />
                        )
                      ) : (
                        <span>{value}</span>
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </Fragment>
          ))}
        </TableBody>
      </Table>
    </Section>
  );
};
