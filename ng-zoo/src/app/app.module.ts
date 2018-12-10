import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { routing, appRoutingProviders } from './app.routing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//Componentes
import { AppComponent } from './app.component';
import { TiendaComponent } from './components/tienda/tienda.component';
import { ParqueComponent } from './components/parques/parque.component';
import { AnimalsComponent } from './components/animals/animals.component';
import { ContactComponent } from './components/contact/contact.component';
import { HomeComponent } from './components/home/home.component';
import { KeeperComponent } from './components/keeper/keeper.component';

//Modulos
import { ModuloEmailModule } from './moduloemail/modulo.email.module';
import { AdminModule } from './admin/admin.module';

@NgModule({
  declarations: [
    AppComponent,
    TiendaComponent,
    ParqueComponent,
    HomeComponent,
    AnimalsComponent,
    ContactComponent,
    KeeperComponent
    ],
  imports: [
    BrowserModule,
    FormsModule, //se agrega para utilizar los formularios de ngModel en angular 7
    routing,
    ModuloEmailModule,
    AdminModule,
    BrowserAnimationsModule
  ],
  providers: [
    appRoutingProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
