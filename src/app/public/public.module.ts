import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PublicRoutingModule } from './public-routing.module';
import { VerEncuestaComponent } from './ver-encuesta/ver-encuesta.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    VerEncuestaComponent
  ],
  imports: [
    CommonModule,
    PublicRoutingModule,
    ReactiveFormsModule
  ]
})
export class PublicModule { }
