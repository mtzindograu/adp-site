'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminPage() {
  const router = useRouter();

  useEffect(() => {
    // O sistema utiliza o hash #admin para abrir o painel via MainLayout.
    // Redirecionamos para a home com o hash para manter a consistência do estado.
    router.replace('/#admin');
  }, [router]);

  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="animate-spin w-8 h-8 border-2 border-[#3FA9F5] border-t-transparent rounded-full" />
    </div>
  );
}
