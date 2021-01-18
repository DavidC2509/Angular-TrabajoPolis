import { Component, OnInit } from '@angular/core';
import { JobService } from '../../../services/job.service';
import { UserService } from '../../../services/user.service';
import { ResumeService } from '../../../services/resume.service';
import { Job } from '../../../models/publicacion';

@Component({
  selector: 'app-list-ofertas',
  templateUrl: './list-ofertas.component.html',
  styleUrls: ['./list-ofertas.component.css']
})
export class ListOfertasComponent implements OnInit {

  listJob: Job[];
  idUsuario;
  cargoUsuario;
  constructor(private sJob: JobService,
              private sResume: ResumeService,
              private sUser: UserService) {
                this.sUser.validadorSolicitante();
                this.idUsuario = this.sUser.usuarioStorageId();
              }
  ngOnInit() {
    this.listar();
  }
  listar() {
    this.sResume.listarByIdPublicacion(this.idUsuario).subscribe(resp => {
      this.listJob = resp.publicaciones;
    });
  }

}
