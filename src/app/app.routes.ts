import { Routes } from '@angular/router';
import { OnboardingComponent } from './onboarding/onboarding.component';

export const routes: Routes = [
  // {
  //   path: '',
  //   redirectTo: 'folder/inbox',
  //   pathMatch: 'full',
  // },
  {
    path: 'onboard',
    component: OnboardingComponent
    // loadComponent: () => import('./onboarding/onboarding.component').then(m => m.OnboardingComponent)
  },
  {
    path: 'folder/:id',
    loadComponent: () =>
      import('./folder/folder.page').then((m) => m.FolderPage),
  },
];
