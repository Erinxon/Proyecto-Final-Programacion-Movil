import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Negocios', url: '/negocios', icon: 'business' },
    { title: 'Agregar', url: '/agregar-negocio', icon: 'add' },
    { title: 'Mapa', url: '/mapa', icon: 'map' },
  ];
  constructor() {}
}
