import { Component, OnInit } from '@angular/core';
import { Resume } from '../../../models/resume';
import { ResumeService } from '../../../services/resume.service';
import { UserService } from '../../../services/user.service';
import { User } from '../../../models/user';

@Component({
  selector: 'app-list-curriculum',
  templateUrl: './list-curriculum.component.html',
  styleUrls: ['./list-curriculum.component.css']
})
export class ListCurriculumComponent implements OnInit {
  listResume: Resume[];
  Usuario: User;
  cargoUsuario;
  bandera = true;
  constructor(private sResume: ResumeService, private sUser: UserService) {
    this.sUser.validadorSolicitante();
    this.Usuario = this.sUser.usuarioStorage();
    this.cargoUsuario = this.sUser.usuarioStorage().rol;
  }

  ngOnInit() {
    console.log(this.cargoUsuario);
    if (this.cargoUsuario === 'Administrador' ) {
      this.bandera = false;
      this.sResume.listar().subscribe(resp => {
        console.log(resp);
        this.listResume = resp.resumes;
      });
      return;
    }
    this.listar();
  }
  listar() {
    this.sResume.listarById(this.Usuario.id).subscribe(resp => {
      console.log(resp);
      this.listResume = resp.resumes;
    });
  }
  eliminar(id) {
    if (!confirm('esta seguro que desea eliminar la publicacion?')) {
      return;
    }
    this.sResume.delete(id).subscribe(resp => {
      if (!resp.res) {
        alert(resp.message);
        return;
      }
      alert('se realizo con exito la operacion');
      this.listar();
    });
  }

}
