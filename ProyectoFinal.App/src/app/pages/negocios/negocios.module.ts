import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NegociosPageRoutingModule } from './negocios-routing.module';

import { NegociosPage } from './negocios.page';
import { SharedPageModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NegociosPageRoutingModule,
    SharedPageModule,
  ],
  declarations: [NegociosPage]
})
export class NegociosPageModule {}
