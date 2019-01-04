import { TranslateService } from '@ngx-translate/core';
import { NbMenuItem } from '@nebular/theme';
import { NgModule, Pipe } from '@angular/core';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'DASHBOARD',
    icon: 'nb-home',
    link: '/pages/dashboard',
    home: true,
  },
  {
    title: 'MAIN_MENU',
    group: true,
  },
  {
    title: 'COMPETITIONS',
    icon: 'nb-keypad',
    link: '/pages/ui-features',
    children: [
      {
        title: 'NEW_COMPETITION',
        link: '/pages/new-competition',
      },
      {
        title: 'MANAGE_COMPETITIONS',
        link: '/pages/manage-competition',
      }
    ]
  },
  {
    title: 'PRIVILEGES',
    icon: 'nb-keypad',
    link: '/pages/privileges',
    children: [
      {
        title: 'ACTION_TYPES',
        link: '/pages/privileges/action-types',
      },
      {
        title: 'ACTIONS',
        link: '/pages/privileges/action',
      },
      {
        title: 'ROLES',
        link: '/pages/privileges/role',
      }
    ]
  },
  {
    title: 'USERS',
    icon: 'nb-person',
    link: ' ',
    children: [
      {
        title: 'NEW_USER',
        link: '/pages/new-user',
      },
      {
        title: 'MANAGE_USERS',
        link: '/pages/manage-user',
      }
    ]
  },
  {
    title: 'REFEREES',
    icon: 'nb-keypad',
    link: ' ',
    children: [
      {
        title: 'NEW_REFEREE',
        link: '/pages/new-referee',
      },
      {
        title: 'MANAGE_REFEREES',
        link: '/pages/manage-referee',
      }
    ]
  },
  {
    title: 'SCHOOLS',
    icon: 'nb-keypad',
    link: ' ',
    children: [
      {
        title: 'NEW_SCHOOL',
        link: '/pages/schools/new',
      },
      {
        title: 'MANAGE_SCHOOLS',
        link: '/pages/schools/manage',
      },
    ]
  },
  {
    title: 'TEAMS',
    icon: 'nb-keypad',
    link: ' ',
    children: [
      {
        title: 'NEW_TEAM',
        link: '/pages/new-team',
      },
      {
        title: 'MANAGE_TEAMS',
        link: '/pages/manage-team',
      },
    ]
  },
  {
    title: 'PHASES',
    icon: 'nb-keypad',
    link: ' ',
    children: [
      {
        title: 'MANAGE_PHASES',
        link: '/pages/manage-phase',
      },
    ]
  },
  {
    title: 'RUNS',
    icon: 'nb-play',
    link: ' ',
    children: [
      {
        title: 'MANAGE_RUNS',
        link: '/pages/manage-run',
      },
    ]
  }
];
