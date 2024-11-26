import { usePathname } from 'next/navigation';

import { Bell, Briefcase, Home, Settings, User, MapPinned } from 'lucide-react';

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
    {
      name: 'Viagens',
      href: '/viagens',
      icon: <MapPinned size={20} />,
      active: isNavItemActive(pathname, '/viagens'),
      position: 'top',
    },
    // {
    //   name: 'Projects',
    //   href: '/projects',
    //   icon: <Briefcase size={20} />,
    //   active: isNavItemActive(pathname, '/projects'),
    //   position: 'top',
    // },
    {
      name: 'Configuracao',
      href: '/configuracao',
      icon: <Settings size={20} />,
      active: isNavItemActive(pathname, '/configuracao'),
      position: 'bottom',
    },
  ];
};