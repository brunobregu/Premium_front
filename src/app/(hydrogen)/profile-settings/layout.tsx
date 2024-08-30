"use client"

import { routes } from '@/config/routes';
import PageHeader from '@/app/shared/page-header';
import ProfileSettingsNav from '@/app/shared/account-settings/navigation';
import { useTranslation } from 'react-i18next';


export default function ProfileSettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const { i18n } = useTranslation();


  const pageHeader = {
    title: i18n.t('account-settings'),
    breadcrumb: [

      {
        href: '/logistics',
        name: i18n.t('home'),
      },
      {
        name: i18n.t('account-settings'),
      },
    ],
  };
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />
      <ProfileSettingsNav />
      {children}
    </>
  );
}
