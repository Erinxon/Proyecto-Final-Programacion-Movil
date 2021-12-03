import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditarNegocioPage } from './editar-negocio.page';

const routes: Routes = [
  {
    path: '',
    component: EditarNegocioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditarNegocioPageRoutingModule {}
