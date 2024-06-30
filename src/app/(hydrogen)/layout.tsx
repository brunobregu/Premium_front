'use client';

import { useIsMounted } from '@hooks/use-is-mounted';
import HydrogenLayout from '@/layouts/hydrogen/layout';
import { usePathname, useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import premiumApi from '@/util/premiumAPI';
import { parse } from 'cookie';
import { useEffect, useMemo, useState } from 'react';
import parseJwt from '@/util/parseJwt';

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
  const [role, setRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isMounted) {
      return;
    }
    const session = parse(document.cookie)?.['session'];
    if (!session) {
      setLoading(false);
      return;
    }

    premiumApi.defaults.headers['Authorization'] = `Bearer ${session}`;

    setRole(
      parseJwt(session)?.[
        'http://schemas.microsoft.com/ws/2008/06/identity/claims/role'
      ]
    );
    setLoading(false);
  }, [isMounted]);

  if (loading) {
    return null;
  }

  if (!role) {
    router.push('/login');
    return null;
  }

  if (pathname === '/logistics/shipments/create' && role !== 'Admin') {
    router.push('/login');
    return null;
  }

  return <HydrogenLayout>{children}</HydrogenLayout>;
}
