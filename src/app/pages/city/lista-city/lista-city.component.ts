import { Component, OnInit } from '@angular/core';
import { City } from 'src/app/models/city';
import { CityService } from '../../../services/city.service';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-lista-city',
  templateUrl: './lista-city.component.html',
  styleUrls: ['./lista-city.component.css']
})
export class ListaCityComponent implements OnInit {

  listCiudades: City[];
  constructor(private sCiudad: CityService, private sUser: UserService) {
    this.sUser.validadorAdm(); }

  ngOnInit() {
    this.listar();
  }
  listar() {
    this.sCiudad.listar().subscribe(resp => {
      if (!resp.res) {
        alert(resp.message);
        return;
      }
      this.listCiudades = resp.ciudades;
    }, error => {});
  }
  eliminar(ciudadId) {
    if (!confirm('esta seguro de eliminar?')) {
      return;
    }
    this.sCiudad.delete(ciudadId).subscribe(resp => {
      if (!resp.res) {
        alert(resp.message);
        return;
      }
      this.listar();
    });
  }

}
