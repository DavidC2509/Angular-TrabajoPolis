import { Component } from '@angular/core';
import { User } from './models/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'SolaresPoli';
  usuario: User;
  tipo = 'Invitado';
  constructor() {
    this.usuario = JSON.parse(localStorage.getItem('usuario'));
    if (this.usuario != null ) {
      this.tipo = this.usuario.rol;
    }
  }
}
