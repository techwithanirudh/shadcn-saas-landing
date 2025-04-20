import { env } from '@/env';

export interface PricingTier {
  id: string;
  name: string;
  price: Record<string, number | string>;
  description: string;
  features: string[];
  cta: {
    href: string;
    label: string;
  };
  highlighted?: boolean;
  popular?: boolean;
}

export const frequencies = ['monthly', 'yearly'];

export const plans: PricingTier[] = [
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

export const groups = [
  {
    name: 'Workspace',
    features: [
      {
        label: 'Users',
        description: 'Invite your team to your workspace.',
        plans: [false, 'Unlimited', 'Unlimited', 'Unlimited'],
      },
      {
        label: 'AI Digest',
        description: 'Get a daily digest of your workspace activity.',
        plans: [false, true, true, true],
      },
      {
        label: 'Multifactor authentication',
        description: 'Add an extra layer of security.',
        plans: [false, false, true, true],
      },
      {
        label: 'Advanced SSO',
        description: 'Sign up with custom SAML SSO.',
        plans: [false, false, true, true],
      },
    ],
  },
  {
    name: 'Monitoring & Automation',
    features: [
      {
        label: 'Auto incident tagging',
        description: 'Automatically tag issues with relevant context.',
        plans: [false, true, true, true],
      },
      {
        label: 'Smart thresholds',
        description: 'Adaptive alerting thresholds based on past activity.',
        plans: [false, true, true, true],
      },
      {
        label: 'Uptime History',
        description: 'See 30/90/365-day uptime logs for your monitors.',
        plans: ['30 days', '90 days', '365 days', '365 days'],
      },
      {
        label: 'Custom Webhooks',
        description: 'Trigger actions via your own API endpoints.',
        plans: [false, false, true, true],
      },
    ],
  },
  {
    name: 'Integrations & Customization',
    features: [
      {
        label: 'Slack & Discord alerts',
        description: 'Send alerts to your favorite team chats.',
        plans: [false, true, true, true],
      },
      {
        label: 'Custom status pages',
        description: 'Share your system status with customers.',
        plans: [false, false, true, true],
      },
      {
        label: 'Theme customization',
        description: 'Customize UI colors and branding.',
        plans: [false, false, false, true],
      },
      {
        label: 'API access',
        description: 'Programmatic access to all your data and monitors.',
        plans: [false, false, true, true],
      },
    ],
  },
];