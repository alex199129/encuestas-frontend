import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VerEncuestaComponent } from './ver-encuesta/ver-encuesta.component';

const routes: Routes = [
  { path: ':slug', component: VerEncuestaComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicRoutingModule { }
