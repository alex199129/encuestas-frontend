import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { CrearEncuestaComponent } from './crear-encuesta/crear-encuesta.component';

const routes: Routes = [
  { path: '', component: MainComponent },
  { path: 'crear', component: CrearEncuestaComponent },
  { path: 'editar/:id', component: CrearEncuestaComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
