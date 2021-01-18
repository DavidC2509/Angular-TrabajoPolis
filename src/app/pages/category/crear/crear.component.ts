import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../../services/category.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-crear',
  templateUrl: './crear.component.html',
  styleUrls: ['./crear.component.css']
})
export class CrearComponent implements OnInit {
  nombreCategoria;
  categoriaId  = 0;
  constructor(private sCategoria: CategoryService,
              private sUser: UserService,
              private route: ActivatedRoute,
              public router: Router) {
                this.sUser.validadorAdm();
              }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (typeof params.id === 'undefined') {
        this.categoriaId = 0;
        return;
      }
      this.categoriaId = params.id;
      this.sCategoria.selectById(this.categoriaId).subscribe((resp) => {
        if (!resp.res) {
          alert(resp.message);
          this.router.navigate(['/categorias']);
          return;
        }
        this.nombreCategoria = resp.categoria.nombre;
      }
      );
    });
  }
  insertar() {
    if ( this.categoriaId !== 0 ) {
      this.sCategoria.update(this.nombreCategoria, this.categoriaId).subscribe(resp => {
        if (!resp.res) {
          alert(resp.message);
          return;
        }
        alert('se realizo exitosamente la operacion');
        this.router.navigate(['/categorias']);
      });
      return;
    }
    this.sCategoria.insert(this.nombreCategoria).subscribe(resp => {
      if (!resp.res) {
        alert(resp.message);
        return;
      }
      alert('se realizo exitosamente la operacion');
      this.router.navigate(['/categorias']);
    });
  }

}
