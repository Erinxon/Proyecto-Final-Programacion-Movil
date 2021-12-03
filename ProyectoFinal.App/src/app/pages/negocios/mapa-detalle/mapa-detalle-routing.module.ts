import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MapaDetallePage } from './mapa-detalle.page';

const routes: Routes = [
  {
    path: '',
    component: MapaDetallePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MapaDetallePageRoutingModule {}
