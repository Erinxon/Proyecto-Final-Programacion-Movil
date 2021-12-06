import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AlertController } from "@ionic/angular";
import { NegocioService } from "src/app/services/negocio.service";
import { PhotoService } from "src/app/services/photo.service";

@Component({
    selector: 'master',
    template: ``
  })
export class BaseComponent {
  form: FormGroup = new FormGroup({});
  isAgregandoImagen: boolean = false;
  isLoanding: boolean = false;
  constructor(protected negocioService: NegocioService, 
    protected fb:  FormBuilder, protected photoService: PhotoService,
    protected alert: AlertController) {
    this.form = this.fb.group({
      nombre: ['', [Validators.required, Validators.maxLength(50), Validators.pattern('[a-zA-Z ]*')]],
      tipoNegocio: ['', [Validators.required, Validators.maxLength(50), Validators.pattern('[a-zA-Z ]*')]],
      foto: ['', [Validators.required]],
      telefono: ['', [Validators.required, Validators.pattern('[0-9]{10}')]],
      direccion: ['', [Validators.required, Validators.maxLength(100)]],
      latitud: ['', [Validators.required, Validators.min(-90), Validators.max(90)]],
      longitud: ['', [Validators.required, Validators.min(-180), Validators.max(180)]]
    });
  }

  getPicture(): void {
    this.isAgregandoImagen = true;
    this.photoService.takePicture().then(f => {
      this.form.patchValue({
        foto: f
      })
      this.isAgregandoImagen = false;
    });
  }

  async showAlert(header: string, message: string) {
    const alert = await this.alert.create({
      header: header,
      message: message,
      buttons: ['OK']
    });
    await alert.present();
  }

}
