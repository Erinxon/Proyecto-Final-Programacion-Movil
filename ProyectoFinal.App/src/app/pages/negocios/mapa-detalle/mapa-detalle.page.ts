import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as mapbox from 'mapbox-gl/dist/mapbox-gl.js';
import { Negocio } from 'src/app/models/negocio.model';
import { NegocioService } from 'src/app/services/negocio.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-mapa-detalle',
  templateUrl: './mapa-detalle.page.html',
  styleUrls: ['./mapa-detalle.page.scss'],
})
export class MapaDetallePage implements OnInit {
  negocio: Negocio;
  constructor(private negocioService: NegocioService,
    private router: ActivatedRoute) { }

  ngOnInit() {
  }

  ionViewDidEnter(){
    const id = this.router.snapshot.paramMap.get('id');
    this.negocioService.getNegocio(id).subscribe((resp) => {
      this.negocio = resp.data;
      this.showMapa();
    }, err => {
      console.log(err);
    })
   
  }

  showMapa(): void {
    mapbox.accessToken = environment.mapboxApiKey;
    const map = new mapbox.Map({
      container: 'mapId',
      style: 'mapbox://styles/erinxon/cksrvnlt82akh17pr4yuidqi0',
      center: [this.negocio.longitud, this.negocio.latitud],
      zoom: 6,
    });

    const marker = new mapbox.Marker({
      color: '#00000',
    })
      .setLngLat([this.negocio.longitud, this.negocio.latitud])
      .setPopup(
        new mapbox.Popup().setHTML(`<p style="color: #000;">${this.negocio.nombre}</p>
            <p style="color: #000;">${this.negocio.tipoNegocio}</p>`)
      )
      .addTo(map);
    
  }
}
