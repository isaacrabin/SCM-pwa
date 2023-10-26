import { Routes } from '@angular/router';
import { OnboardingComponent } from './onboarding/onboarding.component';

const posRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pos/pos-home/pos-home.component').then(m => m.PosHomeComponent)
  }
]
const dashboardRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./inventory-products/inventory-products.component').then(m => m.InventoryProductsComponent)
  },
  {
    path: 'restock',
    loadComponent: () => import('./base-restock/base-restock.component').then(m => m.BaseRestockComponent)
  }
]

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'onboard',
    pathMatch: 'full',
  },
  {
    path: 'onboard',
    component: OnboardingComponent,
    title: 'Onboard'
    // loadComponent: () => import('./onboarding/onboarding.component').then(m => m.OnboardingComponent)
  },
  {
    path: 'login',
    loadComponent: () => import('./login/login.component').then(m => m.LoginComponent),
    title: 'login'
  },
  // {
  //   path: 'folder/:id',
  //   loadComponent: () =>
  //     import('./folder/folder.page').then((m) => m.FolderPage),
  // },
  {
    path: 'pos',
    loadChildren: () => import('./app.routes').then(m => posRoutes),
    title: 'Home'
  },
  {
    path: 'dashboard',
    title: 'Inventory Products',
    loadChildren: () => import('./app.routes').then(m => dashboardRoutes),
  }
];

