import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MapaDetallePageRoutingModule } from './mapa-detalle-routing.module';

import { MapaDetallePage } from './mapa-detalle.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MapaDetallePageRoutingModule
  ],
  declarations: [MapaDetallePage]
})
export class MapaDetallePageModule {}
