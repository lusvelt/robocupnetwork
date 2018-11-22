import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Dashboard',
    icon: 'nb-home',
    link: '/pages/dashboard',
    home: true,
  },
  {
    title: 'MENU\' PRINCIPALE',
    group: true,
  },
  {
    title: 'Competizioni',
    icon: 'nb-keypad',
    link: '/pages/ui-features',
    children: [
      {
        title: 'Nuova Competizione',
        link: '',
      },
      {
       title: 'Lista competizioni',
       link: '/pages/manifestation-list',
      }
    ]
  },
  {
    title: 'Utenti',
    icon: 'nb-keypad',
    link: ' ',
    children: [
      {
        title: 'Gestisci utenti',
        link: '/pages/manage-user',
      },
      {
        title: 'Lista utenti',
        link: '/pages/list-user',
      }
    ]
  }
];
