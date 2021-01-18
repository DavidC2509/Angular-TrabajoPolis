import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { RespuestaTopCategory } from '../models/category';
import { UserService } from './user.service';
const url =  environment.url;

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient, private sUser: UserService) { }
  insert( nombre ) {
    const categoria = {
      nombre
    };
    const params = JSON.stringify(categoria);
    const headers = this.sUser.getHeaders();
    return this.http.post<RespuestaTopCategory>(url + 'category', params, {headers});
  }
  update( nombre , id ) {
    const categoria = {
      nombre
    };
    const params = JSON.stringify(categoria);
    const headers = this.sUser.getHeaders();
    return this.http.put<RespuestaTopCategory>(url + 'category/' + id, params, {headers});
  }
  listar() {
    return this.http.get<RespuestaTopCategory>(url + 'category');
  }
  selectById(categoriaId) {
    const headers = this.sUser.getHeaders();
    return this.http.get<RespuestaTopCategory>(url + 'category/' + categoriaId, {headers});
  }
  delete(categoriaId) {
    const headers = this.sUser.getHeaders();
    return this.http.delete<RespuestaTopCategory>(url + 'category/' + categoriaId, {headers});
  }
}
