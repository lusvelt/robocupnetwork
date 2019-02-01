import { TranslateService } from '@ngx-translate/core';
import { NgModule, Pipe } from '@angular/core';

export const MENU_ITEMS: any[] = [
  {
    title: 'DASHBOARD',
    alias: 'dashboard',
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
    alias: 'users',
    icon: 'fa fa-user',
    link: ' /pages/users',
    children: [
      {
        title: 'NEW_USER',
        alias: 'newUser',
        link: '/pages/users/new-user',
      },
      {
        title: 'MANAGE_USERS',
        alias: 'manageUsers',
        link: '/pages/users/manage-user',
      }
    ]
  },
  {
    title: 'PRIVILEGES',
    alias: 'privileges',
    icon: 'fas fa-shield-alt',
    link: '/pages/privileges',
    children: [
      {
        title: 'ACTION_TYPES',
        alias: 'actionTypes',
        link: '/pages/privileges/action-types',
      },
      {
        title: 'ACTIONS',
        alias: 'actions',
        link: '/pages/privileges/action',
      },
      {
        title: 'ROLES',
        alias: 'roles',
        link: '/pages/privileges/role',
      },
      {
        title: 'MODULES',
        alias: 'modules',
        link: '/pages/privileges/module'
      }
    ]
  },
  {
    title: 'MANIFESTATIONS',
    alias: 'manifestations',
    icon: 'fa fa-flag-checkered',
    link: '/pages/manifestations/new-manifestation'
  },
  {
    title: 'PLACES',
    alias: 'places',
    icon: 'fas fa-map-marker-alt',
    link: '/pages/places/manage-place'
  },
  {
    title: 'CATEGORIES',
    alias: 'categories',
    icon: 'fas fa-clipboard-list',
    link: '/pages/categories/new-category'
  },
  {
    title: 'AGE_RANGES',
    alias: 'ageRanges',
    icon: 'fas fa-exchange-alt',
    link: '/pages/age-ranges/new-age-range'
  },
  {
    title: 'REFEREES',
    alias: 'referees',
    icon: 'fas fa-user-tie',
    link: '/pages/referees/manage-referees'
  },
  {
    title: 'SCHOOLS',
    alias: 'schools',
    icon: 'fas fa-school',
    link: '/pages/schools/manage'
  },
  {
    title: 'TEAMS',
    alias: 'teams',
    icon: 'fas fa-users',
    link: '/pages/teams/manage-team'
  },
  {
    title: 'PHASES',
    alias: 'phases',
    icon: 'fas fa-list-ul',
    link: '/pages/manage-phase'
  },
  {
    title: 'RUNS',
    alias: 'runs',
    icon: 'fas fa-trophy',
    link: '/pages/manage-run'
  }
];
