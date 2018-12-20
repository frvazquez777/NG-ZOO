import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//componentes
import { TiendaComponent } from './components/tienda/tienda.component';
import { AnimalsComponent } from './components/animals/animals.component';
import { AnimalDetailComponent } from './components/animal-detail/animal.detail.component';
import { ContactComponent } from './components/contact/contact.component';
import { HomeComponent } from './components/home/home.component';
import { KeeperComponent } from './components/keeper/keeper.component';

//Componentes Login y Register
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';

//Componente de Error
import { ErrorComponent } from './components/error/error.component';

//actualizacion de datos
import { UserEditComponent } from './components/user-edit/user.edit.component';

//guard security
import { UserGuard } from './services/user.guard';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  //  {path: '', redirectTo: 'tienda', pathMatch: 'full'},
  { path: 'tienda', component: TiendaComponent },
  { path: 'home', component: HomeComponent },
  { path: 'animales', component: AnimalsComponent },
  { path: 'animal/:id', component: AnimalDetailComponent },
  { path: 'contacto', component: ContactComponent },
  { path: 'cuidadores', component: KeeperComponent },
  { path: 'login', component: LoginComponent, canActivate: [UserGuard] },
  { path: 'registro', component: RegisterComponent, canActivate: [UserGuard] },
  { path: 'mis-datos', component: UserEditComponent },
  { path: '**', component: ErrorComponent }
];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
