import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContentComponent } from './layout/components/content/content.component';
import { LoginComponent } from './auth/login/login.component';
import { AuthGuard } from './core/guards/auth-guard.service';

const routes: Routes = [
  { path: '', component: LoginComponent },
  {
    path: 'app',
    component: ContentComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./features/dashboard/dashboard.module').then(m => m.DashboardModule),
      },
    ],
  },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
