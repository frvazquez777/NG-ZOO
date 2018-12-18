import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { routing, appRoutingProviders } from './app.routing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

//Componentes
import { AppComponent } from './app.component';
import { TiendaComponent } from './components/tienda/tienda.component';
import { ParqueComponent } from './components/parques/parque.component';
import { AnimalsComponent } from './components/animals/animals.component';
import { ContactComponent } from './components/contact/contact.component';
import { HomeComponent } from './components/home/home.component';
import { KeeperComponent } from './components/keeper/keeper.component';

//actualizacion de datos
import { UserEditComponent } from './components/user-edit/user.edit.component';

//Componentes Login y Register
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';

//Modulos
import { ModuloEmailModule } from './moduloemail/modulo.email.module';
import { AdminModule } from './admin/admin.module';

//servicios en caso de sean generales para todos los componentes o/u controllers
//import { UserService } from './services/user.service';

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    AppComponent,
    TiendaComponent,
    ParqueComponent,
    HomeComponent,
    AnimalsComponent,
    ContactComponent,
    KeeperComponent,
    UserEditComponent
  ],
  imports: [
    BrowserModule,
    FormsModule, //se agrega para utilizar los formularios de ngModel en angular 7
    routing,
    ModuloEmailModule,
    AdminModule,
    BrowserAnimationsModule,
    HttpClientModule
  ],
  providers: [
    appRoutingProviders
   //, UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
