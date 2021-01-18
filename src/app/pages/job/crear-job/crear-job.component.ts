import { Component, OnInit } from '@angular/core';
import { Category, Category2 } from '../../../models/category';
import { CategoryService } from '../../../services/category.service';
import { CityService } from '../../../services/city.service';
import { City } from 'src/app/models/city';
import { UserService } from 'src/app/services/user.service';
import { JobService } from '../../../services/job.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-crear-job',
  templateUrl: './crear-job.component.html',
  styleUrls: ['./crear-job.component.css']
})
export class CrearJobComponent implements OnInit {
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
  cargoUsuario;
  constructor(private sCategoria: CategoryService,
              private sCiudad: CityService,
              private sJob: JobService,
              private sUsuario: UserService,
              private route: ActivatedRoute,
              public router: Router) {
                this.sUsuario.validadorEmpleador();
                this.usuarioId = sUsuario.usuarioStorageId();
                this.cargoUsuario = sUsuario.usuarioStorage().rol;
              }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (typeof params.idJob === 'undefined') {
        this.publicacionId = 0;
        return;
      }
      this.publicacionId = params.idJob;
      this.sJob.selectById(this.publicacionId).subscribe((resp) => {
        if (!resp.res) {
          alert(resp.message);
          this.router.navigate(['/empleos']);
          return;
        }
        console.log(this.usuarioId + '-' + resp.publicacion.user_id);
        if (this.usuarioId !== resp.publicacion.user_id) {
          if (this.cargoUsuario !== 'Administrador' ) {
            alert('usted no puede editar este formulario');
            this.router.navigate(['/empleos']);
            return;
          }
        }
        this.titulo = resp.publicacion.titulo;
        this.descripcion = resp.publicacion.descripcion;
        this.email = resp.publicacion.email;
        this.empresa = resp.publicacion.empresa;
        this.telefono = resp.publicacion.telefono.substr(5, resp.publicacion.telefono.length);
        this.opcionCiudad = resp.publicacion.ciudad.id + '';
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
  }
  quitarCategoria(item) {
    const i = this.opcionesSelecionadasCategorias.indexOf( item );
    this.opcionesSelecionadasCategorias.splice( i, 1 );
  }
  agregarCategoria() {
    if (this.opcionCategoria === '0') {
      alert('debe de seleccionar una opcion');
      return;
    }
    const num = this.opcionCategoria.split('-')[0];
    const nombre = this.opcionCategoria.split('-')[1];
    let bandera = true;
    // tslint:disable-next-line: prefer-for-of
    for (let index = 0; index < this.opcionesSelecionadasCategorias.length; index++) {
      const element = this.opcionesSelecionadasCategorias[index];
      if (element.id === num || element.id == num) {
        bandera = false;
      }
    }
    if (bandera) {
      this.opcionesSelecionadasCategorias.push(new Category2(num, nombre));
    } else {
      alert('esta categoria ya se encuentra agregada!!');
    }
  }
  insertar() {
    if (this.opcionCiudad === '0') {
      alert('debe de Selecionar una ciudad');
      return;
    }
    if (this.publicacionId !== 0) {
      // tslint:disable-next-line: max-line-length
      this.sJob.update(this.titulo, this.descripcion, this.empresa, this.opcionTelefono + '-' + this.telefono, this.email, this.opcionesSelecionadasCategorias, this.opcionCiudad, this.usuarioId, this.publicacionId).subscribe(resp => {
        if (!resp.res) {
          alert(resp.message);
          return;
        }
        alert('la operacion se realizo exitosamenta');
        this.router.navigate(['/empleos']);
      });
      return;
    }
    // tslint:disable-next-line: max-line-length
    this.sJob.insert(this.titulo, this.descripcion, this.empresa, this.opcionTelefono + '-' + this.telefono, this.email, this.opcionesSelecionadasCategorias, this.opcionCiudad, this.usuarioId).subscribe(resp => {
      if (!resp.res) {
        alert(resp.message);
        return;
      }
      alert('la operacion se realizo exitosamenta');
      this.router.navigate(['/empleos']);
    });
  }
}
