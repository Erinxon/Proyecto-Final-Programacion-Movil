import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'negocios',
    pathMatch: 'full'
  },
  {
    path: 'negocios',
    loadChildren: () => import('./pages/negocios/negocios.module').then( m => m.NegociosPageModule)
  },
  {
    path: 'mapa',
    loadChildren: () => import('./pages/mapa/mapa.module').then( m => m.MapaPageModule)
  },
  {
    path: 'agregar-negocio',
    loadChildren: () => import('./pages/agregar-negocio/agregar-negocio.module').then( m => m.AgregarNegocioPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
