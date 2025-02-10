export const childRoutes = [
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./admin/dashboard/dashboard.module').then(m => m.DashboardModule),
    data: { icon: 'dashboard', text: 'Dashboard' }
  },
  {
    path: 'metrics',
    loadChildren: () =>
      import('./admin/charts/charts.module').then(m => m.ChartsModule),
    data: { icon: 'bar_chart', text: 'Metrics' }
  },
  {
    path: 'projects',
    loadChildren: () =>
      import('./admin/tables/tables.module').then(m => m.TablesModule),
    data: { icon: 'table_chart', text: 'Projects' }
  },
  {
    path: 'userProfile',
    loadChildren: () =>
      import('./admin/userprofile/userprofile.module').then(m => m.UserprofileModule),
    data: { icon: 'person', text: 'User profile' }
  }
];

export interface RouteData {
  icon: string;
  text: string;
}

export interface ChildRoute {
  path: string;
  loadChildren: () => Promise<any>; // This represents the lazy-loaded module.
  data: RouteData; // The `data` property, which contains `icon` and `text`.
}