import { Component, OnInit } from '@angular/core';
import { Job } from '../../../models/publicacion';
import { JobService } from '../../../services/job.service';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-lista-job',
  templateUrl: './lista-job.component.html',
  styleUrls: ['./lista-job.component.css']
})
export class ListaJobComponent implements OnInit {
  listJob: Job[];
  idUsuario;
  cargoUsuario;
  constructor(private sJob: JobService,
              private sUser: UserService) {
                this.sUser.validadorEmpleador();
                this.idUsuario = this.sUser.usuarioStorageId();
                this.cargoUsuario = this.sUser.usuarioStorage().rol;
              }

  ngOnInit() {
    if (this.cargoUsuario === 'Administrador' ) {
      this.sJob.listar().subscribe(resp => {
        this.listJob = resp.publicaciones;
      });
      return;
    }
    this.listar();
  }
  listar() {
    this.sJob.listarById(this.idUsuario).subscribe(resp => {
      this.listJob = resp.publicaciones;
    });
  }
  eliminar(id) {
    if (!confirm('esta seguro que desea eliminar la publicacion?')) {
      return;
    }
    this.sJob.delete(id).subscribe(resp => {
      if (!resp.res) {
        alert(resp.message);
        return;
      }
      alert('se realizo con exito la operacion');
      this.listar();
    });
  }

}
