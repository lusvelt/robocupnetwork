import { TranslateService } from '@ngx-translate/core';
import { NbMenuItem } from '@nebular/theme';
import { NgModule, Pipe } from '@angular/core';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'DASHBOARD',
    icon: 'fa fa-home fa-lg',
    link: '/pages/dashboard',
    home: true,
  },
  {
    title: 'MAIN_MENU',
    group: true,
  },
  {
    title: 'USERS',
    icon: 'fa fa-user',
    link: ' /pages/users',
    children: [
      {
        title: 'NEW_USER',
        link: '/pages/users/new-user',
      },
      {
        title: 'MANAGE_USERS',
        link: '/pages/users/manage-user',
      }
    ]
  },
  {
    title: 'PRIVILEGES',
    icon: 'fas fa-shield-alt',
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
      },
      {
        title: 'MODULES',
        link: '/pages/privileges/module'
      }
    ]
  },
  {
    title: 'MANIFESTATIONS',
    icon: 'fa fa-flag-checkered',
    link: '/pages/manifestations/new-manifestation'
  },
  {
    title: 'PLACES',
    icon: 'fas fa-map-marker-alt',
    link: '/pages/places/manage-place'
  },
  {
    title: 'CATEGORIES',
    icon: 'fas fa-clipboard-list',
    link: '/pages/categories/new-category'
  },
  {
    title: 'AGE_RANGES',
    icon: 'fas fa-exchange-alt',
    link: '/pages/age-ranges/new-age-range'
  },
  {
    title: 'REFEREES',
    icon: 'fas fa-user-tie',
    link: '/pages/referees/manage-referees'
  },
  {
    title: 'SCHOOLS',
    icon: 'fas fa-school',
    link: '/pages/schools/manage'
  },
  {
    title: 'TEAMS',
    icon: 'fas fa-users',
    link: '/pages/teams/manage-team'
  },
  {
    title: 'PHASES',
    icon: 'fas fa-list-ul',
    link: '/pages/manage-phase'
  },
  {
    title: 'RUNS',
    icon: 'fas fa-trophy',
    link: '/pages/manage-run'
  }
];
