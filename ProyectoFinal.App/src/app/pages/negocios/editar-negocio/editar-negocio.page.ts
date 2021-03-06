import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AddNegocioModel } from 'src/app/models/addNegocioModel.model';
import { Negocio } from 'src/app/models/negocio.model';
import { NegocioService } from 'src/app/services/negocio.service';
import { PhotoService } from 'src/app/services/photo.service';
import { BaseComponent } from 'src/app/shared/BaseComponent/base-component';

@Component({
  selector: 'app-editar-negocio',
  templateUrl: './editar-negocio.page.html',
  styleUrls: ['./editar-negocio.page.scss'],
})
export class EditarNegocioPage extends BaseComponent implements OnInit, OnDestroy {
  negocio: Negocio;
  isLoanding: boolean = true;
  isLoandingEdi: boolean = false;;
  constructor(
    protected negocioService: NegocioService,
    protected router: ActivatedRoute,
    protected fb: FormBuilder,
    protected photoService: PhotoService,
    protected route: Router,
    protected alert: AlertController
  ){
    super(negocioService, fb, photoService,alert);
  }
  
  ngOnDestroy(): void {
    this.negocio = null;
  }

  ngOnInit() {
    const id = this.router.snapshot.paramMap.get('id');
    this.negocioService.getNegocio(id).subscribe((resp) => {
      this.negocio = {...resp.data};
      this.form.patchValue({...this.negocio});
      this.isLoanding = false;
    }, error => {
      this.isLoanding = false;
    });
  }

  onSubmit() {
    this.isLoandingEdi = true;
    const negocio: AddNegocioModel = {
      ...this.form.value,
    };
    this.updateNegocio(negocio);
  }

  updateNegocio(negocio: AddNegocioModel): void {
    this.negocioService.updateNegocio(this.negocio.id, negocio).subscribe((resp) => {
      this.isLoandingEdi = false;
      this.showAlert('Negocio actualizado', 'El negocio se actualizo correctamente');
      this.route.navigate(['/negocios'], { replaceUrl: true });
    }, err => {
      this.showAlert('Error', 'No se pudo actualizar el negocio');
      this.isLoandingEdi = false;
    });
  }


}
