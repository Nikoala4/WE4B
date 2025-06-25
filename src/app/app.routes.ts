import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RoutesComponent } from './routes/routes.component';
import { HomeComponent } from './home/home.component';
import { connectedGuard } from './guards/connected.guard';
import { disconnectedGuard } from './guards/disconnected.guard';
import { RedirectBlankComponent } from './redirectblank/redirectblank.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';

export const routes: Routes = [
    {path:'', component:HomeComponent, canActivate: [connectedGuard]},
    {path:'redirect', component:RedirectBlankComponent},
    {path:'login', component: LoginComponent, canActivate: [disconnectedGuard]},
    {path:'forgot-password', component: ForgotPasswordComponent, canActivate: [disconnectedGuard]},
    {path:'routes', component: RoutesComponent, canActivate: [connectedGuard]},
];

