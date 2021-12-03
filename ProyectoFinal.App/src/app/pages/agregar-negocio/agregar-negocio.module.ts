import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AgregarNegocioPageRoutingModule } from './agregar-negocio-routing.module';

import { AgregarNegocioPage } from './agregar-negocio.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    AgregarNegocioPageRoutingModule
  ],
  declarations: [AgregarNegocioPage]
})
export class AgregarNegocioPageModule {}
