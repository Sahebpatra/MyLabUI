import { Routes } from '@angular/router';
import { LayoutComponent } from './shared/components/layout/layout.component';
import { NewTestsComponent } from './pages/tests/new-test/new-tests.component';
// import { authGuard } from './auth/auth.guard'; // Assume you created this functional guard

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/login/login.component').then((m) => m.LoginComponent),
  },
  {
    path: 'admin',
    component: LayoutComponent,
    children: [
      { path: '', redirectTo: 'new-test', pathMatch: 'full' },
      {
        path: 'new-patient',
        loadComponent: () =>
          import('./pages/patients/patient-registration/patient-registration.component').then(
            (m) => m.PatientRegistrationComponent,
          ),
      },
      {
        path: 'edit-patient/:id',
        loadComponent: () =>
          import('./pages/patients/patient-registration/patient-registration.component').then(
            (m) => m.PatientRegistrationComponent,
          ),
      },
      {
        path: 'patient-list',
        loadComponent: () =>
          import('./pages/patients/patient-list/patient-list.component').then(
            (m) => m.PatientListComponent,
          ),
      },
      {
        path: 'test-list',
        loadComponent: () =>
          import('./pages/tests/test-list/test-list.component').then(
            (m) => m.TestListComponent,
          ),
      },
      { path: 'new-test', component: NewTestsComponent },
      {
        path: 'edit-test/:id',
        loadComponent: () =>
          import('./pages/tests/new-test/new-tests.component').then(
            (m) => m.NewTestsComponent,
          ),
      },
    ],
  },
  { path: '**', redirectTo: 'login' },
];
