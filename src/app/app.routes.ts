import { Routes } from '@angular/router';
import { OnboardingComponent } from './onboarding/onboarding.component';

const posRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pos/pos-home/pos-home.component').then(m => m.PosHomeComponent)
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
    component: OnboardingComponent
    // loadComponent: () => import('./onboarding/onboarding.component').then(m => m.OnboardingComponent)
  },
  {
    path: 'login',
    loadComponent: () => import('./login/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'folder/:id',
    loadComponent: () =>
      import('./folder/folder.page').then((m) => m.FolderPage),
  },
  {
    path: 'pos',
    loadChildren: () => import('./app.routes').then(m => posRoutes)
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./login/login.component').then(m => m.LoginComponent)
  }
];

