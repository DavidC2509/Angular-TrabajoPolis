import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-crear-user',
  templateUrl: './crear-user.component.html',
  styleUrls: ['./crear-user.component.css']
})
export class CrearUserComponent implements OnInit {
  opcionSelecionada = '0';
  nombre;
  email;
  password;
  apellidos;
  usuarioId;
  constructor(private sUsuario: UserService,
              private route: ActivatedRoute,
              public router: Router) { this.sUsuario.validadorAdm(); }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (typeof params.id === 'undefined') {
        this.usuarioId = 0;
        return;
      }
      this.usuarioId = params.id;
      this.sUsuario.selectById(this.usuarioId).subscribe((resp) => {
        if (!resp.res) {
          alert(resp.message);
          this.router.navigate(['/usuarios']);
          return;
        }
        this.nombre = resp.usuario.nombres;
        this.apellidos = resp.usuario.apellidos;
        this.email = resp.usuario.email;
        this.opcionSelecionada = resp.usuario.rol;
      }
      );
    });
  }
  insertar() {
    if (this.opcionSelecionada === '0') {
      alert('debe de seleccionar una opcion');
      return;
    }
    if ( this.usuarioId !== 0 ) {
      // tslint:disable-next-line: max-line-length
      this.sUsuario.update(this.nombre, this.apellidos, this.email, this.password, this.opcionSelecionada, this.usuarioId).subscribe(resp => {
        if (!resp.res) {
          alert(resp.message);
          return;
        }
        alert('se realizo exitosamente la operacion');
        this.router.navigate(['/usuarios']);
      });
      return;
    }
    this.sUsuario.insert(this.nombre, this.apellidos, this.email, this.password, this.opcionSelecionada).subscribe(resp => {
      if (!resp.res) {
        if (resp.reason) {
          // tslint:disable-next-line: max-line-length
          alert((resp.validator.nombres || '') + '\n' + (resp.validator.apellidos || '') + '\n' + (resp.validator.email || '') + '\n' + (resp.validator.password || ''));
          return;
        }
        alert(resp.message);
        return;
      }
      alert('se realizo exitosamente la operacion');
      this.router.navigate(['/usuarios']);
    });
  }

}
