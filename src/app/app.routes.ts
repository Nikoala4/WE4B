import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RoutesComponent } from './routes/routes.component';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
    {path:'', component:HomeComponent},
    {path:'login', component: LoginComponent},
    {path:'routes', component: RoutesComponent},
];

