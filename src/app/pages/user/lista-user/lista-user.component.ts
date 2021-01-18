import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-lista-user',
  templateUrl: './lista-user.component.html',
  styleUrls: ['./lista-user.component.css']
})
export class ListaUserComponent implements OnInit {
  listUsuarios: User[];
  constructor(private sUser: UserService) { this.sUser.validadorAdm(); }

  ngOnInit() {
    this.listar();
  }
  listar() {
    this.sUser.listar().subscribe(resp => {
      if (!resp.res) {
        alert(resp.message);
      }
      this.listUsuarios = resp.usuarios;
    });
  }
  eliminar(idUser) {
    if (!confirm('esta seguro de eliminar?')) {
      return;
    }
    this.sUser.delete(idUser).subscribe(resp => {
      if (!resp.res) {
        alert(resp.message);
        return;
      }
      this.listar();
    });
  }

}
