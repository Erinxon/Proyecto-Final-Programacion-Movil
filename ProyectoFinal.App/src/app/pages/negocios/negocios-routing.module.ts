import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NegociosPage } from './negocios.page';

const routes: Routes = [
  {
    path: '',
    component: NegociosPage
  },
  {
    path: 'detalle/:id',
    loadChildren: () => import('./detalle/detalle.module').then( m => m.DetallePageModule)
  },
  {
    path: 'mapa-detalle/:id',
    loadChildren: () => import('./mapa-detalle/mapa-detalle.module').then( m => m.MapaDetallePageModule)
  },
  {
    path: 'editar-negocio/:id',
    loadChildren: () => import('./editar-negocio/editar-negocio.module').then( m => m.EditarNegocioPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NegociosPageRoutingModule {}
