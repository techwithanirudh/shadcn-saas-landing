import { env } from '@/env';

export const frequencies = ['monthly', 'yearly'];

export const plans = [
  {
    id: 'individuals',
    name: 'Individuals',
    price: {
      monthly: 'Free',
      yearly: 'Free',
    },
    description: 'For your hobby projects',
    features: [
      'Free email alerts',
      '3-minute checks',
      'Automatic data enrichment',
      '10 monitors',
      'Up to 3 seats',
    ],
    cta: {
      href: env.NEXT_PUBLIC_APP_URL,
      label: 'Get started',
    },
  },
  {
    id: 'teams',
    name: 'Teams',
    price: {
      monthly: 90,
      yearly: 75,
    },
    description: 'Great for small businesses',
    features: [
      'Unlimited phone calls',
      '30 second checks',
      'Single-user account',
      '20 monitors',
      'Up to 6 seats',
    ],
    cta: {
      href: env.NEXT_PUBLIC_APP_URL,
      label: 'Get started',
    },
    popular: true,
  },
  {
    id: 'organizations',
    name: 'Organizations',
    price: {
      monthly: 120,
      yearly: 100,
    },
    description: 'Great for large businesses',
    features: [
      'Unlimited phone calls',
      '15 second checks',
      'Single-user account',
      '50 monitors',
      'Up to 10 seats',
    ],
    cta: {
      href: env.NEXT_PUBLIC_APP_URL,
      label: 'Get started',
    },
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: {
      monthly: 'Custom',
      yearly: 'Custom',
    },
    description: 'For multiple teams',
    features: [
      'Everything in Organizations',
      'Up to 5 team members',
      '100 monitors',
      '15 status pages',
      '200+ integrations',
    ],
    cta: {
      href: '/contact',
      label: 'Contact us',
    },
    highlighted: true,
  },
];
