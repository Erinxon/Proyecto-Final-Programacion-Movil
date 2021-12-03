import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditarNegocioPageRoutingModule } from './editar-negocio-routing.module';

import { EditarNegocioPage } from './editar-negocio.page';
import { SharedPageModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    EditarNegocioPageRoutingModule,
    SharedPageModule,
  ],
  declarations: [EditarNegocioPage]
})
export class EditarNegocioPageModule {}
