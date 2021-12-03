import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Negocio } from 'src/app/models/negocio.model';
import { NegocioService } from 'src/app/services/negocio.service';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.page.html',
  styleUrls: ['./detalle.page.scss'],
})
export class DetallePage implements OnInit {
  negocio: Negocio;
  isLoanding: boolean = true;
  constructor(private negocioService: NegocioService,
    private router: ActivatedRoute) { }

  ngOnInit() {
    this.getNegocio();
  }

  getNegocio(){
    const id = this.router.snapshot.paramMap.get('id');
    this.negocioService.getNegocio(id).subscribe((resp) => {
      this.negocio = resp.data;
      this.isLoanding = false;
    }, err => {
      this.isLoanding = false;
    });
  }

}
