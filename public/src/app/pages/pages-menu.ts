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
    title: 'MANIFESTATIONS',
    icon: 'fa fa-flag-checkered',
    link: '/pages/manifestations',
    children: [
      {
        title: 'MANAGE_MANIFESTATIONS',
        link: '/pages/manifestations/new-manifestation',
      }
    ]
  },
  {
    title: 'PLACES',
    icon: 'fas fa-map-marker-alt',
    link: '/pages/places',
    children: [
      {
        title: 'MANAGE_PLACES',
        link: '/pages/places/manage-place',
      }
    ]
  },
  {
    title: 'AGE_RANGES',
    icon: 'fas fa-exchange-alt',
    link: '/pages/age-ranges',
    children: [
      {
        title: 'NEW_AGE_RANGE',
        link: '/pages/age-ranges/new-age-range',
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
      }
    ]
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
    title: 'REFEREES',
    icon: 'fas fa-user-tie',
    link: ' ',
    children: [
      {
        title: 'MANAGE_REFEREES',
        link: '/pages/referees/manage-referees',
      }
    ]
  },
  {
    title: 'SCHOOLS',
    icon: 'fas fa-school',
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
    icon: 'fas fa-users',
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
    icon: 'fas fa-list-ul',
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
    icon: 'fas fa-trophy',
    link: ' ',
    children: [
      {
        title: 'MANAGE_RUNS',
        link: '/pages/manage-run',
      },
    ]
  }
];
