import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RespuestaTopCity } from '../models/city';
import { environment } from '../../environments/environment';
import { RespuestaTopJob } from '../models/publicacion';
import { UserService } from './user.service';
const url =  environment.url;
@Injectable({
  providedIn: 'root'
})
export class JobService {

  constructor(private http: HttpClient, private sUser: UserService) { }
  insert( titulo, descripcion, empresa, telefono, email, categorias, idCiudad, idUsuario ) {
    const empleo = {
      titulo, descripcion, empresa, telefono, email, categorias, idCiudad, idUsuario
    };
    const params = JSON.stringify(empleo);
    const headers = this.sUser.getHeaders();
    return this.http.post<RespuestaTopJob>(url + 'job', params, {headers});
  }
  update( titulo, descripcion, empresa, telefono, email, categorias, idCiudad, idUsuario, id ) {
    const empleo = {
      titulo, descripcion, empresa, telefono, email, categorias, idCiudad, idUsuario
    };
    const params = JSON.stringify(empleo);
    const headers = this.sUser.getHeaders();
    return this.http.put<RespuestaTopJob>(url + 'job/' + id, params, {headers});
  }
  listar() {
    return this.http.get<RespuestaTopJob>(url + 'job');
  }
  listarById(id) {
    const headers = this.sUser.getHeaders();
    return this.http.get<RespuestaTopJob>(url + 'misPublicaciones/' + id, {headers});
  }
  selectById(jobId) {
    return this.http.get<RespuestaTopJob>(url + 'jobVista/' + jobId);
  }
  delete(jobId) {
    const headers = this.sUser.getHeaders();
    return this.http.delete<RespuestaTopJob>(url + 'job/' + jobId, {headers});
  }
  busqueda(laBusqueda: string) {
    const empleo = {
      laBusqueda
    };
    const params = JSON.stringify(empleo);
    return this.http.post<RespuestaTopJob>(url + 'laBusqueda', params );
  }
}
