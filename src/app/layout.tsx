"use client"

import { Toaster } from 'react-hot-toast';
import GlobalDrawer from '@/app/shared/drawer-views/container';
import GlobalModal from '@/app/shared/modal-views/container';
import { ThemeProvider } from '@/app/shared/theme-provider';
import { siteConfig } from '@/config/site.config';
import { inter, lexendDeca } from '@/app/fonts';
import cn from '@utils/class-names';
import NextProgress from '@components/next-progress';

// styles
import 'swiper/css';
import 'swiper/css/navigation';
import '@/app/globals.css';
import { QueryClientProvider } from '@tanstack/react-query';
import premiumQueryClient from '@/util/premiumQueryClient';
import { FiltersProvider } from '@/store/state';
import { I18nextProvider } from 'react-i18next'; // Import I18nextProvider
import i18n from '../../i18'; // Import the initialized i18n configuration
import { useEffect } from 'react';


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {


  useEffect(() => {
    const storedLang = localStorage.getItem('language');
    if (storedLang) {

      i18n.changeLanguage(storedLang);
    }
  }, [children]);

  return (
    <html
      lang="en"
      dir="ltr"
      // required this one for next-themes, remove it if you are not using next-theme
      suppressHydrationWarning
    >
      <body
        // to prevent any warning that is caused by third party extensions like Grammarly
        suppressHydrationWarning
        className={cn(inter.variable, lexendDeca.variable, 'font-inter')}
      >

        <FiltersProvider>
          <QueryClientProvider client={premiumQueryClient}>
            <ThemeProvider>
              <I18nextProvider i18n={i18n}>
                <NextProgress />
                {children}
                <Toaster />
                <GlobalDrawer />
                <GlobalModal />
              </I18nextProvider>
            </ThemeProvider>
          </QueryClientProvider>
        </FiltersProvider>

      </body>
    </html>
  );
}
