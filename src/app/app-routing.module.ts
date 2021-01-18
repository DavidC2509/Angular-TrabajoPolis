import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IndexComponent } from './pages/index/index.component';
import { ErrorComponent } from './pages/error/error.component';
import { LoginComponent } from './pages/login/login.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { CrearComponent } from './pages/category/crear/crear.component';
import { ListaComponent } from './pages/category/lista/lista.component';
import { CrearCityComponent } from './pages/city/crear-city/crear-city.component';
import { ListaCityComponent } from './pages/city/lista-city/lista-city.component';
import { CrearUserComponent } from './pages/user/crear-user/crear-user.component';
import { ListaUserComponent } from './pages/user/lista-user/lista-user.component';
import { CrearJobComponent } from './pages/job/crear-job/crear-job.component';
import { ListaJobComponent } from './pages/job/lista-job/lista-job.component';
import { VistaJobComponent } from './pages/job/vista-job/vista-job.component';
import { CreateCurriculumComponent } from './pages/curriculum/create-curriculum/create-curriculum.component';
import { ListCurriculumComponent } from './pages/curriculum/list-curriculum/list-curriculum.component';
import { ListOfertasComponent } from './pages/curriculum/list-ofertas/list-ofertas.component';

const routes: Routes = [
  { path: '', component: IndexComponent},
  {path: 'index', component: IndexComponent},
  {path: 'index/:laBusqueda', component: IndexComponent},
  {path: 'login', component: LoginComponent},
  {path: 'registro', component: RegistroComponent},
  {path: 'categoria', component: CrearComponent},
  {path: 'categoria/:id', component: CrearComponent},
  {path: 'categorias', component: ListaComponent},
  {path: 'ciudad', component: CrearCityComponent},
  {path: 'ciudad/:id', component: CrearCityComponent},
  {path: 'ciudades', component: ListaCityComponent},
  {path: 'usuario', component: CrearUserComponent},
  {path: 'usuario/:id', component: CrearUserComponent},
  {path: 'usuarios', component: ListaUserComponent},
  {path: 'empleo', component: CrearJobComponent},
  {path: 'empleo/:idJob', component: CrearJobComponent},
  {path: 'empleos', component: ListaJobComponent},
  {path: 'detalleEmpleo/:idJob', component: VistaJobComponent},
  {path: 'detalleEmpleo/:idJob/curriculum', component: CreateCurriculumComponent},
  {path: 'detalleEmpleo/:idJob/registro', component: RegistroComponent},
  {path: 'curriculum', component: CreateCurriculumComponent},
  {path: 'curriculum/:id', component: CreateCurriculumComponent},
  {path: 'listCurriculum', component: ListCurriculumComponent},
  {path: 'misPropuestas', component: ListOfertasComponent},
  { path: '**', component: ErrorComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
