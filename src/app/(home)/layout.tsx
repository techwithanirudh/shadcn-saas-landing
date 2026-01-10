import { HomeLayout } from 'fumadocs-ui/layouts/home';
import type { ReactNode } from 'react';
import { Footer } from '@/components/sections/footer';
import { Header } from '@/components/sections/header';
import { baseOptions, linkItems } from '../layout.shared';

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <HomeLayout
      {...baseOptions}
      links={linkItems}
      nav={{
        component: (
          <Header
            links={linkItems}
            {...baseOptions}
            themeSwitch={{ enabled: false }}
          />
        ),
      }}
      className='pt-0'
    >
      <main className='flex flex-1 flex-col divide-y divide-dashed divide-border border-border border-dashed sm:border-b'>
        {children}
        <Footer />
      </main>
    </HomeLayout>
  );
};

export default Layout;
