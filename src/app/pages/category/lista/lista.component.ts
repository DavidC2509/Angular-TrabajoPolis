import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../../services/category.service';
import { Category } from '../../../models/category';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css']
})
export class ListaComponent implements OnInit {
  listCategorias: Category[];
  constructor(private sCategoria: CategoryService, private sUser: UserService) {
    this.sUser.validadorAdm();
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
  }
  eliminar(categoriaId) {
    if (!confirm('esta seguro de eliminar?')) {
      return;
    }
    this.sCategoria.delete(categoriaId).subscribe(resp => {
      if (!resp.res) {
        alert(resp.message);
        return;
      }
      this.listar();
    });
  }
}
