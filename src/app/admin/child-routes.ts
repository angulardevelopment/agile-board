export const childRoutes = [
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./dashboard/dashboard.module').then(m => m.DashboardModule),
    data: { icon: 'dashboard', text: 'Dashboard' }
  },
  {
    path: 'metrics',
    loadChildren: () =>
      import('./charts/charts.module').then(m => m.ChartsModule),
    data: { icon: 'bar_chart', text: 'Metrics' }
  },
  {
    path: 'projects',
    loadChildren: () =>
      import('./tables/tables.module').then(m => m.TablesModule),
    data: { icon: 'table_chart', text: 'Projects' }
  },
  {
    path: 'tables',
    loadChildren: () =>
      import('./tables/tables.module').then(m => m.TablesModule),
    data: { icon: 'person', text: 'User profile' }
  },
  {
    path: 'tables',
    loadChildren: () =>
      import('./tables/tables.module').then(m => m.TablesModule),
    data: { icon: 'settings', text: 'Settings' }
  },
  {
    path: 'tables',
    loadChildren: () =>
      import('./tables/tables.module').then(m => m.TablesModule),
    data: { icon: 'exit_to_app', text: 'Logout' }
  }
];
