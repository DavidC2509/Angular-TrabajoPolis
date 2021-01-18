import { Component, OnInit } from '@angular/core';
import { CityService } from '../../../services/city.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-crear-city',
  templateUrl: './crear-city.component.html',
  styleUrls: ['./crear-city.component.css']
})
export class CrearCityComponent implements OnInit {

  nombreCiudad;
  ciudadId  = 0;

  constructor(private sCiudad: CityService,
              private route: ActivatedRoute,
              public router: Router,
              private sUser: UserService) {
                this.sUser.validadorAdm();
              }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (typeof params.id === 'undefined') {
        this.ciudadId = 0;
        return;
      }
      this.ciudadId = params.id;
      this.sCiudad.selectById(this.ciudadId).subscribe((resp) => {
        if (!resp.res) {
          alert(resp.message);
          return;
        }
        this.nombreCiudad = resp.ciudad.nombre;
      }
      );
    });
  }
  insertar() {
    if ( this.ciudadId !== 0 ) {
      this.sCiudad.update(this.nombreCiudad, this.ciudadId).subscribe(resp => {
        if (!resp.res) {
          alert(resp.message);
          return;
        }
        alert('se realizo exitosamente la operacion');
        this.router.navigate(['/ciudades']);
      });
      return;
    }
    this.sCiudad.insert(this.nombreCiudad).subscribe(resp => {
      if (!resp.res) {
        alert(resp.message);
        return;
      }
      alert('se realizo exitosamente la operacion');
      this.router.navigate(['/ciudades']);
    });
  }
}
