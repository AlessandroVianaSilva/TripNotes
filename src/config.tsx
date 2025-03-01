import { usePathname } from 'next/navigation';

import {  Home, User,  } from 'lucide-react';

export const NavItems = () => {
  const pathname = usePathname();

  function isNavItemActive(pathname: string, nav: string) {
    return pathname.includes(nav);
  }

  return [
    {
      name: 'Inicio',
      href: '/',
      icon: <Home size={20} />,
      active: pathname === '/',
      position: 'top',
    },
    {
      name: 'Perfil',
      href: '/perfil',
      icon: <User size={20} />,
      active: isNavItemActive(pathname, '/perfil'),
      position: 'top',
    },
  ];
};