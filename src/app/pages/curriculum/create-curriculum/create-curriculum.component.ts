import { Component, OnInit } from '@angular/core';
import { CityService } from '../../../services/city.service';
import { City } from '../../../models/city';
import { UserService } from '../../../services/user.service';
import { User } from '../../../models/user';
import { ResumeService } from '../../../services/resume.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-create-curriculum',
  templateUrl: './create-curriculum.component.html',
  styleUrls: ['./create-curriculum.component.css']
})
export class CreateCurriculumComponent implements OnInit {

  listCiudades: City[];
  opcionCiudad = '0';
  usuario: User;
  resumeId = 0;
  /* datos de currinculum */
  trabajosAnteriores: string;
  logros: string;
  profesion: string;
  telefono: string;
  fecha: string;
  /* JobId */
  idJob = 0;
  constructor(private sCiudad: CityService,
              private sUser: UserService,
              private sResume: ResumeService,
              private route: ActivatedRoute,
              public router: Router) {
                this.sUser.validadorSolicitante();
                this.usuario = this.sUser.usuarioStorage();
              }

  ngOnInit() {
    this.listar();
    this.route.params.subscribe(params => {
      if (typeof params.idJob !== 'undefined') {
        this.idJob = params.idJob;
        console.log(this.idJob);
      }
      if (typeof params.id === 'undefined') {
        this.resumeId = 0;
        return;
      }
      this.resumeId = params.id;
      this.sResume.selectById(this.resumeId).subscribe((resp) => {
        console.log(resp);
        if (!resp.res) {
          alert(resp.message);
          return;
        }
        this.trabajosAnteriores = resp.resumen.trabajosAnteriores;
        this.logros = resp.resumen.logros;
        this.profesion = resp.resumen.profesion;
        this.telefono  = resp.resumen.telefono.split('-')[1];
        this.opcionCiudad = resp.resumen.city_id;
        this.fecha = resp.resumen.fechaNacimiento;
      }
      );
    });
  }
  listar() {
    this.sCiudad.listar().subscribe(resp => {
      if (!resp.res) {
        alert(resp.message);
        return;
      }
      this.listCiudades = resp.ciudades;
    });
  }
  insert() {
    if (this.opcionCiudad === '0') {
      alert('seleccione una ciudad');
    }
    if (this.resumeId !== 0) {
      // tslint:disable-next-line: max-line-length
      this.sResume.update(this.trabajosAnteriores, this.logros, this.profesion, ( '+591-' + this.telefono), this.opcionCiudad, this.fecha, this.usuario.id, this.resumeId).subscribe(resp => {
        console.log(resp);
        if (!resp.res) {
          if (resp.reason) {
            // tslint:disable-next-line: max-line-length
            alert((resp.validator.trabajosAnteriores || '') + '\n' + (resp.validator.fechaNacimiento || '') + '\n' + (resp.validator.logros || '') + '\n' + (resp.validator.profesion || '') + '\n' + (resp.validator.telefono || ''));
            return;
          }
          alert(resp.message);
          return;
        }
        alert('se realizo exitosamente la operacion');
      });
      return;
    }
    // tslint:disable-next-line: max-line-length
    this.sResume.insert(this.trabajosAnteriores, this.logros, this.profesion, ( '+591-' + this.telefono), this.opcionCiudad, this.fecha, this.usuario.id).subscribe(resp => {
      console.log(resp);
      if (!resp.res) {
        if (resp.reason) {
          // tslint:disable-next-line: max-line-length
          alert((resp.validator.trabajosAnteriores || '') + '\n' + (resp.validator.fechaNacimiento || '') + '\n' + (resp.validator.logros || '') + '\n' + (resp.validator.profesion || '') + '\n' + (resp.validator.telefono || ''));
          return;
        }
        alert(resp.message);
        return;
      }
      if ( this.idJob !== 0) {
        this.router.navigate(['/detalleEmpleo', this.idJob]);
        return;
      }
      alert('se realizo exitosamente la operacion');
    });
  }
}
