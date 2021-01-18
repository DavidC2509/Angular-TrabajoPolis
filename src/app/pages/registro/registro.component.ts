import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  nombresRegistro = '';
  apellidosRegistro = '';
  emailRegistro = '';
  passwordRegistro = '';
 /* JobId */
  idJob = 0;
  constructor(private sUsuario: UserService,
              private route: ActivatedRoute,
              public router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (typeof params.idJob !== 'undefined') {
        this.idJob = params.idJob;
      }
    });
  }
  insertar() {
    // console.log(this.nombresRegistro);
    // tslint:disable-next-line: max-line-length
    this.sUsuario.insert(this.nombresRegistro, this.apellidosRegistro, this.emailRegistro, this.passwordRegistro, 'Solicitante').subscribe(resp => {
      console.log(resp);
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
      localStorage.setItem('usuario', JSON.stringify(resp.usuario));
      localStorage.setItem('access_token', 'Bearer ' + resp.access_token);
      if ( this.idJob !== 0) {
        location.replace('/detalleEmpleo/' + this.idJob);
        // this.router.navigate(['/detalleEmpleo', this.idJob]);
        return;
      }
      location.replace('/index');
    });
  }

}
