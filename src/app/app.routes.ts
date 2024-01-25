import { Routes } from '@angular/router';
import { OnboardingComponent } from './onboarding/onboarding.component';
import { AuthGuard } from './shared/guards/auth.guard';

const posRoutes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    loadComponent: () => import('./pos/pos-home/pos-home.component').then(m => m.PosHomeComponent)
  },
  {
    path: 'item/:id',
    canActivate: [AuthGuard],
    loadComponent: () => import('./view-item-pos/view-item-pos.component').then(m => m.ViewItemPosComponent)
  },
  {
    path: 'checkout',
    canActivate: [AuthGuard],
    loadComponent: () => import('./base-pos-checkout/base-pos-checkout.component').then(m => m.BasePosCheckoutComponent)
  },
  {
    path: 'sales',
    canActivate: [AuthGuard],
    loadComponent: () => import('./sales/sales.component').then(m => m.SalesComponent)
  },
  {
    path: 'sales/:id',
    canActivate: [AuthGuard],
    loadComponent: () => import('./view-sale/view-sale.component').then(m => m.ViewSaleComponent)
  }
]
const dashboardRoutes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    loadComponent: () => import('./inventory-products/inventory-products.component').then(m => m.InventoryProductsComponent)
  },
  {
    path: 'restock',
    canActivate: [AuthGuard],
    loadComponent: () => import('./base-restock/base-restock.component').then(m => m.BaseRestockComponent)
  },
  {
    path: 'address',
    canActivate: [AuthGuard],
    loadComponent: () => import('./address/address.component').then(m => m.AddressComponent)
  },
  {
    path: 'item/:id',
    canActivate: [AuthGuard],
    loadComponent: () => import('./view-item-dashboard/view-item-dashboard.component').then(m => m.ViewItemDashboardComponent)
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
    canActivate: [AuthGuard],
    loadChildren: () => import('./app.routes').then(m => posRoutes),
    title: 'Home'
  },
  {
    path: 'dashboard',
    canActivate: [AuthGuard],
    title: 'Inventory Products',
    loadChildren: () => import('./app.routes').then(m => dashboardRoutes),
  }
];

