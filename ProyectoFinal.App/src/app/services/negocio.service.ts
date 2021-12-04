import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AddNegocioModel } from '../models/addNegocioModel.model';
import { ApiResponse } from '../models/apiResponse.model';
import { Negocio } from '../models/negocio.model';
import { RequestParameter } from '../models/requestParameter.model';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class NegocioService {
  private negocios: Negocio[] = [];
  private negocios$: BehaviorSubject<Negocio[]> = new BehaviorSubject<Negocio[]>(this.negocios);

  constructor(private http: HttpClient) {
      
  }

  getNegocios(parameter: RequestParameter): Observable<ApiResponse<Negocio[]>> {
    return this.http.get<ApiResponse<Negocio[]>>(`${environment.apiUrl}?PageNumber=${parameter.pageNumber}&PageSize=${parameter.pageSize}`);
  }

  getNegociosMap(): Observable<ApiResponse<Negocio[]>> {
    return this.http.get<ApiResponse<Negocio[]>>(`${environment.apiUrl}/map`);
  }

  getNegocio(id: string): Observable<ApiResponse<Negocio>>  {
    return this.http.get<ApiResponse<Negocio>>(`${environment.apiUrl}/${id}`);
  }

  addNegocio(negocio: AddNegocioModel): Observable<ApiResponse<number>> {
    return this.http.post<ApiResponse<number>>(`${environment.apiUrl}`, negocio);
  }

  updateNegocio(id: string,negocio: AddNegocioModel): Observable<ApiResponse<number>> {
    return this.http.put<ApiResponse<number>>(`${environment.apiUrl}/${id}`, negocio);
  }

  deleteNegocio(id: string): Observable<ApiResponse<number>> {
    return this.http.delete<ApiResponse<number>>(`${environment.apiUrl}/${id}`);
  }




}
