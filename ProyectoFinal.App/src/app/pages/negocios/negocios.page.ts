import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, IonInfiniteScroll } from '@ionic/angular';
import { Negocio } from 'src/app/models/negocio.model';
import { RequestParameter } from 'src/app/models/requestParameter.model';
import { NegocioService } from 'src/app/services/negocio.service';

@Component({
  selector: 'app-negocios',
  templateUrl: './negocios.page.html',
  styleUrls: ['./negocios.page.scss'],
})
export class NegociosPage implements OnInit {
  negocios: Negocio[];
  lengthNegocios: number;
  loanding: boolean = false;
  isToEdit: boolean = false;
  parameter: RequestParameter = {
    pageNumber:1,
    pageSize: 10,
  }
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  constructor(
    private negocioService: NegocioService,
    private alert: AlertController,
    private router: Router
  ) {}

  ngOnInit() {
    this.getNegocios();
  }

  getNegocios() {
    this.loanding = true;
    this.negocioService.getNegocios(this.parameter).subscribe(
      (res) => {
        this.lengthNegocios = res.totalRegistros;
        this.negocios = res.data;
        this.loanding = false;
      },
      (err) => {
        this.loanding = false;
      }
    );
  }

  ionViewWillEnter() {
    if (this.isToEdit) {
      this.parameter.pageNumber = 1;
      this.parameter.pageSize = 10;
      this.getNegocios();
      this.isToEdit = false;
    }
  }

  eliminarNegocio(negocio: Negocio) {
    this.showAlert(negocio.id);
  }

  async showAlert(id: string) {
    const alert = await this.alert.create({
      header: 'Confirmar!',
      message: '¿Está seguro de eliminar el negocio?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {},
        },
        {
          text: 'Si',
          handler: () => {
            this.negocioService.deleteNegocio(id).subscribe((res) => {
               this.negocios = this.negocios.filter((negocio) => negocio.id != id);
               this.lengthNegocios--; 
            });
          },
        },
      ],
    });
    await alert.present();
  }

  toEdit(negocio: Negocio) {
    this.negocios= null;
    this.isToEdit = true;
    this.router.navigate(['/negocios/editar-negocio',negocio.id]);
  }

  getNegociosInfiteScroll() {
    this.negocioService.getNegocios(this.parameter).subscribe(
      (res) => {
        this.lengthNegocios = res.totalRegistros;
        this.negocios = [...this.negocios, ...res.data];
      });
  }

  loadData(event){
    setTimeout(() => {
      this.parameter.pageNumber++;
      this.getNegociosInfiteScroll();
      event.target.complete(); 
      if (this.negocios.length == this.lengthNegocios) {
        event.target.disabled = true; 
      }
    }, 700);
  }

  toggleInfiniteScroll() {
    this.infiniteScroll.disabled = !this.infiniteScroll.disabled;
  }

}
