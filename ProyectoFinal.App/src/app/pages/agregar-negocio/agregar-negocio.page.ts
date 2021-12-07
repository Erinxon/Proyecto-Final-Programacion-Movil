import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AddNegocioModel } from 'src/app/models/addNegocioModel.model';
import { Negocio } from 'src/app/models/negocio.model';
import { NegocioService } from 'src/app/services/negocio.service';
import { PhotoService } from 'src/app/services/photo.service';
import { BaseComponent } from 'src/app/shared/BaseComponent/base-component';

@Component({
  selector: 'app-agregar-negocio',
  templateUrl: './agregar-negocio.page.html',
  styleUrls: ['./agregar-negocio.page.scss'],
})
export class AgregarNegocioPage extends BaseComponent implements OnInit {


  constructor(
    protected negocioService: NegocioService, 
    protected fb:  FormBuilder, protected photoService: PhotoService,
    protected alert: AlertController
  ){
    super(negocioService, fb, photoService, alert);
  }

  ngOnInit() {
  }

  onSubmit() {
    this.isLoanding = true;
    const negocio:AddNegocioModel = {
      ...this.form.value
    }
    this.addNegocio(negocio);
  }

  addNegocio(negocio: AddNegocioModel){
    this.negocioService.addNegocio(negocio).subscribe(res => {
      this.isLoanding = false;
      this.showAlert('Negocio agregado', 'El negocio se ha agregado correctamente');
      this.reset();
    }, err => {
      this.showAlert('Error', 'Ocurrio un error al agregar el negocio');
      this.isLoanding = false;
    });
  }

  reset(){
    this.form.reset();
  }


}
