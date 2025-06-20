import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResultadoComponent } from './encuestas/resultado/resultado.component';

const routes: Routes = [
  { path: '', redirectTo: 'auth/login', pathMatch: 'full' },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
  },
  {
    path: 'encuesta',
    loadChildren: () => import('./public/public.module').then(m => m.PublicModule)
  },
  {
    path: 'dashboard/resultados/:id',
    component: ResultadoComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
