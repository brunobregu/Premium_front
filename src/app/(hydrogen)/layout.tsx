'use client';

import { useIsMounted } from '@hooks/use-is-mounted';
import HydrogenLayout from '@/layouts/hydrogen/layout';
import { usePathname, useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import premiumApi from '@/util/premiumAPI';
import { parse } from 'cookie';

type LayoutProps = {
  children: React.ReactNode;
};

export default function DefaultLayout({ children }: LayoutProps) {
  return <LayoutProvider>{children}</LayoutProvider>;
}

function LayoutProvider({ children }: LayoutProps) {
  const pathname = usePathname();
  const router = useRouter();

  const isMounted = useIsMounted();
  const sessionCookie = parse(document.cookie);
  const session = sessionCookie['session'];
  const query = useQuery({
    queryKey: ['user'],
    queryFn: () =>
      premiumApi.get('/Authentication/getUsersOfRole', {
        params: { role: 'admin' },
      }),
    enabled: !!session && isMounted,
  });

  if (!session) {
    router.push('/login');
  }
  if (!isMounted && query.isLoading) {
    return null;
  }

  if (query.data) return <HydrogenLayout>{children}</HydrogenLayout>;
}
