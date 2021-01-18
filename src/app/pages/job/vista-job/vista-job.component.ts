import { Component, OnInit } from '@angular/core';
import { Category, Category2 } from '../../../models/category';
import { City } from '../../../models/city';
import { CategoryService } from '../../../services/category.service';
import { CityService } from '../../../services/city.service';
import { JobService } from '../../../services/job.service';
import { UserService } from '../../../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../../models/user';
import { ResumeService } from '../../../services/resume.service';
import { Resume } from '../../../models/resume';

@Component({
  selector: 'app-vista-job',
  templateUrl: './vista-job.component.html',
  styleUrls: ['./vista-job.component.css']
})
export class VistaJobComponent implements OnInit {
  opcionCategoria = '0';
  opcionCiudad = '0';
  opcionTelefono = '+591';
  titulo;
  descripcion;
  email;
  empresa;
  telefono;
  usuarioId;
  listCategorias: Category[];
  listCiudades: City[];
  publicacionId;
  opcionesSelecionadasCategorias: Category2[] = [];
  banderaCategorias = true;
  codigoTelefono;
  usuario: User;
  /* opcion Resume */
  opcionResume = 0;
  listResume: Resume[];
  /*Datos de registro de usuario*/
  nombresRegistro = '';
  apellidosRegistro = '';
  emailRegistro = '';
  passwordRegistro = '';

  constructor(private sCategoria: CategoryService,
              private sCiudad: CityService,
              private sJob: JobService,
              private sResume: ResumeService,
              private sUsuario: UserService,
              private route: ActivatedRoute,
              public router: Router) {
                this.usuario = this.sUsuario.usuarioStorage();
                console.log(this.usuario);
              }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (typeof params.idJob === 'undefined') {
        this.publicacionId = 0;
        this.router.navigate(['/index']);
        return;
      }
      this.publicacionId = params.idJob;
      this.sJob.selectById(this.publicacionId).subscribe((resp) => {
        if (!resp.res) {
          alert(resp.message);
          this.router.navigate(['/index']);
          return;
        }
        this.titulo = resp.publicacion.titulo;
        this.descripcion = resp.publicacion.descripcion;
        this.email = resp.publicacion.email;
        this.empresa = resp.publicacion.empresa;
        this.codigoTelefono = resp.publicacion.telefono.split('-')[0];
        this.telefono = resp.publicacion.telefono.split('-')[1];
        this.opcionCiudad = resp.publicacion.ciudad.nombre;
        this.opcionesSelecionadasCategorias = resp.publicacion.categorias;
      }
      );
    });
    this.listar();
  }
  listar() {
    this.sCategoria.listar().subscribe(resp => {
      if (!resp.res) {
        alert(resp.message);
        return;
      }
      this.listCategorias = resp.categorias;
    });
    this.sCiudad.listar().subscribe(resp => {
      if (!resp.res) {
        alert(resp.message);
        return;
      }
      this.listCiudades = resp.ciudades;
    });
    this.usuario = this.sUsuario.usuarioStorage();
    this.sResume.listarById(this.usuario.id).subscribe(resp => {
      this.listResume = resp.resumes;
    });
  }
  postularse() {
    if (this.opcionResume == 0) {
      alert('Debe selecionar un resume');
    }
    this.sResume.insertJobResume(this.publicacionId, this.opcionResume).subscribe(resp => {
      if (!resp.res) {
        alert(resp.message);
        return;
      }
      alert('se postulo con exito');
    });
  }
  insertar() {
    // tslint:disable-next-line: max-line-length
    this.sUsuario.insert(this.nombresRegistro, this.apellidosRegistro, this.emailRegistro, this.passwordRegistro, 'Solicitante').subscribe(resp => {
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
      location.reload();
    });
  }
  
}
