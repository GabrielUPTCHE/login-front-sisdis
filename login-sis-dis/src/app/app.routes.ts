import { Routes } from '@angular/router';

export const routes: Routes = [

  {
    path: '',
    loadComponent: () => import('./views/login/login').then(m => m.Login)
  },
  {
    path: 'dashboard-admin',
    loadComponent: () => import('./views/dashboard-admin/dashboard-admin').then(m => m.DashboardAdmin)
  },
  {
    path: 'dashboard-user',
    loadComponent: () => import('./views/dashboard-regular-user/dashboard-regular-user').then(m => m.DashboardRegularUser)
  }
];
