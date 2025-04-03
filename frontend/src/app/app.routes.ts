import { Routes } from '@angular/router';
import { AltaUsuariosComponent } from './pages/alta-usuarios/alta-usuarios.component';
import { LoginUsuariosComponent } from './pages/login-usuarios/login-usuarios.component';
import { ListaUsuariosComponent } from './pages/lista-usuarios/lista-usuarios.component';

export const routes: Routes = [

    { path: 'alta-usuarios', component: AltaUsuariosComponent },
    { path: 'login-usuarios', component: LoginUsuariosComponent },
    { path: 'lista-usuarios', component: ListaUsuariosComponent },
    { path: '', redirectTo: '/login-usuarios', pathMatch: 'full' } 

];
