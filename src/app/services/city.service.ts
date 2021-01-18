import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RespuestaTopCity } from '../models/city';
import { environment } from '../../environments/environment';
import { UserService } from './user.service';
const url =  environment.url;
@Injectable({
  providedIn: 'root'
})
export class CityService {

  constructor(private http: HttpClient, private sUser: UserService) { }
  insert( nombre ) {
    const ciudad = {
      nombre
    };
    const headers = this.sUser.getHeaders();
    const params = JSON.stringify(ciudad);
    return this.http.post<RespuestaTopCity>(url + 'city', params, {headers});
  }
  update( nombre , id ) {
    const ciudad = {
      nombre
    };
    const params = JSON.stringify(ciudad);
    const headers = this.sUser.getHeaders();
    return this.http.put<RespuestaTopCity>(url + 'city/' + id, params, {headers});
  }
  listar() {
    return this.http.get<RespuestaTopCity>(url + 'city');
  }
  selectById(ciudadId) {
    const headers = this.sUser.getHeaders();
    return this.http.get<RespuestaTopCity>(url + 'city/' + ciudadId, {headers});
  }
  delete(ciudadId) {
    const headers = this.sUser.getHeaders();
    return this.http.delete<RespuestaTopCity>(url + 'city/' + ciudadId, {headers});
  }
}
