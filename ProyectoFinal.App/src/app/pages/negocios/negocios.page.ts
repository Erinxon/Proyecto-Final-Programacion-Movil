import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Negocio } from 'src/app/models/negocio.model';
import { NegocioService } from 'src/app/services/negocio.service';

@Component({
  selector: 'app-negocios',
  templateUrl: './negocios.page.html',
  styleUrls: ['./negocios.page.scss'],
})
export class NegociosPage implements OnInit {
  negocios: Negocio[];
  loanding: boolean = false;
  isToEdit: boolean = false;
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
    this.negocioService.getNegocios().subscribe(
      (res) => {
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
              this.getNegocios();
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
}
