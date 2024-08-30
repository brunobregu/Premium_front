'use client';

import { Title, Text, Avatar, Button, Popover } from 'rizzui';
import cn from '@utils/class-names';
import { routes } from '@/config/routes';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { serialize, parse } from 'cookie';
import parseJwt from '@/util/parseJwt';
import { useTranslation } from 'react-i18next';
import { useFiltersContext } from '@/store/state';

export default function ProfileMenu({
  buttonClassName,
  avatarClassName,
  username = false,
}: {
  buttonClassName?: string;
  avatarClassName?: string;
  username?: boolean;
}) {
  const [user, setUser] = useState<{ name: string; email: string; username: string } | null>(null);

  useEffect(() => {
    const session = parse(document.cookie)?.['session'];
    if (session) {
      const parsedToken = parseJwt(session);
      setUser({
        name: parsedToken?.['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'],
        email: parsedToken?.email,
        username: parsedToken?.['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'],
      });
    }
  }, []);

  if (!user) return null;

  return (
    <ProfileMenuPopover user={user}>
      <Popover.Trigger>
        <button
          className={cn(
            'w-9 shrink-0 rounded-full outline-none focus-visible:ring-[1.5px] focus-visible:ring-gray-400 focus-visible:ring-offset-2 active:translate-y-px sm:w-10',
            buttonClassName
          )}
        >
          <Avatar
            src="https://isomorphic-furyroad.s3.amazonaws.com/public/avatars/avatar-11.webp"
            name={user.name}
            className={cn('!h-9 w-9 sm:!h-10 sm:!w-10', avatarClassName)}
          />
          {!!username && (
            <span className="username hidden text-gray-200 dark:text-gray-700 md:inline-flex">
              Hi, {user.name}
            </span>
          )}
        </button>
      </Popover.Trigger>

      <Popover.Content className="z-[9999] p-0 dark:bg-gray-100 [&>svg]:dark:fill-gray-100">
        <DropdownMenu user={user} />
      </Popover.Content>
    </ProfileMenuPopover>
  );
}

function ProfileMenuPopover({ children, user }: React.PropsWithChildren<{ user: { name: string; email: string; username: string } }>) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <Popover
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      shadow="sm"
      placement="bottom-end"
    >
      {children}
    </Popover>
  );
}



function DropdownMenu({ user }: { user: { name: string; email: string; username: string } }) {
  const router = useRouter();
  function handleLogout() {
    const cookie = serialize('session', '', {
      httpOnly: false,
      maxAge: 0, // One week
      path: '/',
    });
    document.cookie = cookie;
    router.replace('/');
  }
  const { i18n } = useTranslation();
  const { lang, setLang } = useFiltersContext();
  // const [locale, setLocale] = useState(i18n.language);

  useEffect(() => {
    const storedLang = localStorage.getItem('language');
    if (storedLang && storedLang !== lang) {
      setLang(storedLang);
      i18n.changeLanguage(storedLang);
      // setLocale(storedLang);
    }
  }, [lang]);

  function handleLocaleClick(nextLocale: string) {
    localStorage.setItem('language', nextLocale);
    setLang(nextLocale);
    i18n.changeLanguage(nextLocale);
    // setLocale(nextLocale);
  }
  const currentLang = localStorage.getItem('language');



  useEffect(() => {
    handleLocaleClick(lang)
  }, [lang]);

  const menuItems = [
    {
      name: i18n.t('account-settings'),
      href: routes.forms.profileSettings,
    },
  ];

  return (
    <div className="w-64 text-left rtl:text-right">
      <div className="flex items-center border-b border-gray-300 px-6 pb-5 pt-6">
        <Avatar
          src="https://isomorphic-furyroad.s3.amazonaws.com/public/avatars/avatar-11.webp"
          name={user.name}
        />
        <div className="ms-3">
          <Title as="h6" className="font-semibold">
            {user.name}
          </Title>
          <Text className="text-gray-600">{user.email}</Text>
        </div>
      </div>
      <div className="grid px-3.5 py-3.5 font-medium text-gray-700">
        {menuItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className="group my-0.5 flex items-center rounded-md px-2.5 py-2 hover:bg-gray-100 focus:outline-none hover:dark:bg-gray-50/50"
          >
            {item.name}
          </Link>
        ))}
      </div>
      <div className="border-t border-gray-300 px-6 pb-6 pt-5">
        {lang === 'sq' ? <Button
          className="h-auto w-full justify-start p-0 font-medium text-gray-700 outline-none focus-within:text-gray-600 hover:text-gray-900 focus-visible:ring-0"
          variant="text"
          onClick={() => { handleLocaleClick('en') }}
        >
          Kthe ne anglisht
        </Button> : <Button
          className="h-auto w-full justify-start p-0 font-medium text-gray-700 outline-none focus-within:text-gray-600 hover:text-gray-900 focus-visible:ring-0"
          variant="text"
          onClick={() => { handleLocaleClick('sq') }}
        >
          Change to albanian
        </Button>}
      </div>
      <div className="border-t border-gray-300 px-6 pb-6 pt-5">
        <Button
          className="h-auto w-full justify-start p-0 font-medium text-gray-700 outline-none focus-within:text-gray-600 hover:text-gray-900 focus-visible:ring-0"
          variant="text"
          onClick={handleLogout}
        >
          {i18n.t('sign-out')}
        </Button>
      </div>
    </div>
  );
}
