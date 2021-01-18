import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Input() tipo = 'Invitado';
  // tipo = 'Invitado';
  usuario: User;
  constructor(public router: Router) {
    this.usuario = JSON.parse(localStorage.getItem('usuario'));
    if (this.usuario != null ) {
      // this.tipo = this.usuario.rol;
    }
    // console.log(this.usuario);
  }
  ngOnInit() {
  }
  logout() {
    localStorage.clear();
    location.reload();
  }

}
