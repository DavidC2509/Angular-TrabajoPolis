import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RespuestaTopResume } from '../models/resume';
import { UserService } from './user.service';
import { environment } from '../../environments/environment';
import { RespuestaTopJob } from '../models/publicacion';

const url =  environment.url;

@Injectable({
  providedIn: 'root'
})
export class ResumeService {
  constructor(private http: HttpClient, private sUser: UserService) { }
  insert( trabajos, logros, profesion, telefono, idCiudad, fecha, idUsuario ) {
    const resume = {
      trabajos, logros, profesion, telefono, idCiudad, fecha, idUsuario
    };
    const params = JSON.stringify(resume);
    const headers = this.sUser.getHeaders();
    return this.http.post<RespuestaTopResume>(url + 'resume', params, {headers});
  }
  update( trabajos, logros, profesion, telefono, idCiudad, fecha, idUsuario, resumenId ) {
    const resume = {
      trabajos, logros, profesion, telefono, idCiudad, fecha, idUsuario
    };
    const params = JSON.stringify(resume);
    const headers = this.sUser.getHeaders();
    return this.http.put<RespuestaTopResume>(url + 'resume/' + resumenId, params, {headers});
  }
  listar() {
    const headers = this.sUser.getHeaders();
    return this.http.get<RespuestaTopResume>(url + 'susResume', {headers});
  }
  listarById(id) {
    const headers = this.sUser.getHeaders();
    return this.http.get<RespuestaTopResume>(url + 'listResume/' + id, {headers});
  }
  listarByIdPublicacion(id) {
    const headers = this.sUser.getHeaders();
    return this.http.get<RespuestaTopJob>(url + 'misSolicitudes/' + id, {headers});
  }
  selectById(resumeId) {
    const headers = this.sUser.getHeaders();
    return this.http.get<RespuestaTopResume>(url + 'resume/' + resumeId, {headers});
  }
  delete(resumeId) {
    const headers = this.sUser.getHeaders();
    return this.http.delete<RespuestaTopResume>(url + 'resume/' + resumeId, {headers});
  }
  insertJobResume(jobId, resumeId) {
    const resume = {
      jobId, resumeId
    };
    const params = JSON.stringify(resume);
    const headers = this.sUser.getHeaders();
    return this.http.post<RespuestaTopResume>(url + 'jobResume', params, {headers});
  }
}
