import { Component, OnInit } from '@angular/core';
import { Category } from '../../models/category';
import { CategoryService } from '../../services/category.service';
import { City } from '../../models/city';
import { CityService } from '../../services/city.service';
import { Job } from '../../models/publicacion';
import { JobService } from '../../services/job.service';
import { ResumeService } from '../../services/resume.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  listCategorias: Category[];
  listCiudades: City[];
  listTrabajos: Job[];
  opcion = '';
  constructor(private sCategoria: CategoryService,
              private sCiudad: CityService,
              private sTrabajo: JobService,
              private sResume: ResumeService,
              private route: ActivatedRoute,
              public router: Router) {
                this.route.params.subscribe(params => {
                  if (typeof params.laBusqueda === 'undefined') {
                    this.sTrabajo.listar().subscribe(resp => {
                      this.listTrabajos = resp.publicaciones;
                    });
                    return;
                  }
                  // console.log(params.laBusqueda);
                  this.opcion = 'en ' + params.laBusqueda.split(':')[1];
                  this.sTrabajo.busqueda(params.laBusqueda).subscribe(resp => {
                    this.listTrabajos = resp.publicaciones;
                    console.log(resp);
                  });
                });
  }

  ngOnInit() {
    this.listar();
  }
  listar() {
    this.sCategoria.listar().subscribe(resp => {
      if (!resp.res) {
        alert(resp.message);
        return;
      }
      this.listCategorias = resp.categorias;
    }, error => {});
    this.sCiudad.listar().subscribe(resp => {
      if (!resp.res) {
        alert(resp.message);
        return;
      }
      this.listCiudades = resp.ciudades;
    }, error => {});
    
  }
}
