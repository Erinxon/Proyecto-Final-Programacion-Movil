import { Component, OnInit } from '@angular/core';
import { Negocio } from 'src/app/models/negocio.model';
import { NegocioService } from 'src/app/services/negocio.service';
import { environment } from 'src/environments/environment';
import * as mapbox from 'mapbox-gl/dist/mapbox-gl.js';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.page.html',
  styleUrls: ['./mapa.page.scss'],
})
export class MapaPage implements OnInit {
  negocios: Negocio[];
  constructor(private negocioService: NegocioService) { }

  ngOnInit() {
  }

  ionViewDidEnter(){
    this.negocioService.getNegociosMap().subscribe((res) => {
      this.negocios = res.data;
      this.showMapa();
    });
  }

  showMapa(): void {
    mapbox.accessToken = environment.mapboxApiKey;
    const map = new mapbox.Map({
      container: 'mapId',
      style: 'mapbox://styles/erinxon/cksrvnlt82akh17pr4yuidqi0',
      center: [-70.162651, 18.735693],
      zoom: 5,
    });

    this.negocios.forEach(negocio => {
      const marker = new mapbox.Marker({
        color: '#00000',
      })
        .setLngLat([negocio.longitud, negocio.latitud])
        .setPopup(
          new mapbox.Popup().setHTML(`<p style="color: #000;">${negocio.nombre}</p>
              <p style="color: #000;">${negocio.tipoNegocio}</p>`)
        )
        .addTo(map);
    });
    
  }

}
