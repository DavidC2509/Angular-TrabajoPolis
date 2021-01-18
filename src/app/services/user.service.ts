import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { RespuestaTopUser, User } from '../models/user';
import { Router } from '@angular/router';


const url =  environment.url;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, public router: Router) { }
  login(email, password) {
    const user = {
      email, password
    };
    const params = JSON.stringify(user);
    const header = new HttpHeaders().set('Content-type', 'application/json');
    return this.http.post<RespuestaTopUser>(url + 'loginTokens', params, {headers: header});
  }
  listar() {
    const headers = this.getHeaders();
    return this.http.get<RespuestaTopUser>(url + 'user', {headers});
  }
  selectById(usuarioId) {
    const headers = this.getHeaders();
    return this.http.get<RespuestaTopUser>(url + 'user/' + usuarioId, {headers});
  }
  insert( nombres, apellidos, email, password, rol ) {
    const usuario = {
      nombres, apellidos, email, password, rol
    };
    const params = JSON.stringify(usuario);
    const headers = this.getHeaders();
    return this.http.post<RespuestaTopUser>(url + 'user', params, {headers});
  }
  update( nombres, apellidos, email, password, rol, id ) {
    const usuario = {
      nombres, apellidos, email, password, rol
    };
    const params = JSON.stringify(usuario);
    const headers = this.getHeaders();
    return this.http.put<RespuestaTopUser>(url + 'user/' + id, params, {headers});
  }
  delete(usuarioId) {
    const headers = this.getHeaders();
    return this.http.delete<RespuestaTopUser>(url + 'user/' + usuarioId, {headers});
  }
  validadorAdm() {
    const usuario: User = JSON.parse(localStorage.getItem('usuario'));
    if (usuario == null || usuario.rol !== 'Administrador' ) {
      alert('acceso denegado');
      this.router.navigate(['/index']);
      return false;
    }
    return true;
  }
  validadorSolicitante() {
    const usuario: User = JSON.parse(localStorage.getItem('usuario'));
    if (usuario == null || usuario.rol === 'Empleador' ) {
      alert('acceso denegado');
      this.router.navigate(['/index']);
      return false;
    }
    return true;
  }
  validadorEmpleador() {
    const usuario: User = JSON.parse(localStorage.getItem('usuario'));
    if (usuario == null || usuario.rol === 'Solicitante' ) {
      alert('acceso denegado');
      this.router.navigate(['/index']);
      return false;
    }
    return true;
  }
  usuarioStorageId() {
    const usuario: User = JSON.parse(localStorage.getItem('usuario'));
    if (usuario == null ) {
      return 0;
    }
    return usuario.id;
  }
  usuarioStorage() {
    const usuario: User = JSON.parse(localStorage.getItem('usuario'));
    if (usuario == null ) {
      return null;
    }
    return usuario;
  }
  getToken() {
    return localStorage.getItem('access_token');
  }
  getHeaders() {
    const header = new HttpHeaders({'Content-type': 'application/json', Authorization: this.getToken() + ''});
    return header;
  }
}
