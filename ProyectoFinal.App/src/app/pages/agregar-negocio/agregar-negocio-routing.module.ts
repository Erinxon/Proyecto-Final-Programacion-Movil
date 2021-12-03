import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AgregarNegocioPage } from './agregar-negocio.page';

const routes: Routes = [
  {
    path: '',
    component: AgregarNegocioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AgregarNegocioPageRoutingModule {}
