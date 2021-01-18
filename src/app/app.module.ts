import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IndexComponent } from './pages/index/index.component';
import { ErrorComponent } from './pages/error/error.component';

/*angualar Forms */
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
/*peticiones Http */
import { HttpClientModule } from '@angular/common/http';

import { ComponentsModule } from './components/components.module';
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

@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    ErrorComponent,
    LoginComponent,
    RegistroComponent,
    CrearComponent,
    ListaComponent,
    CrearCityComponent,
    ListaCityComponent,
    CrearUserComponent,
    ListaUserComponent,
    CrearJobComponent,
    ListaJobComponent,
    VistaJobComponent,
    CreateCurriculumComponent,
    ListCurriculumComponent,
    ListOfertasComponent
  ],
  imports: [
    FormsModule,
    ComponentsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
