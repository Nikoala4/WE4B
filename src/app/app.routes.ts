import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RoutesComponent } from './routes/routes.component';
import { HomeComponent } from './home/home.component';
import { connectedGuard } from './guards/connected.guard';
import { disconnectedGuard } from './guards/disconnected.guard';
import { RedirectBlankComponent } from './redirectblank/redirectblank.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ProfileComponent } from './profile/profile.component';

export const routes: Routes = [
    {path:'login', component: LoginComponent, canActivate: [disconnectedGuard]},
    {path:'forgot-password', component: ForgotPasswordComponent, canActivate: [disconnectedGuard]},
    {path:'', component:HomeComponent, canActivate: [connectedGuard], children: [
        {path:'redirect', component:RedirectBlankComponent},
        {path:'routes', component: RoutesComponent, canActivate: [connectedGuard]},
        {path:'profile', component: ProfileComponent, canActivate: [connectedGuard]},
        {path:'profile/:userId', component: ProfileComponent, canActivate: [connectedGuard]},
    ], data: {
        renderMode: 'client'
    }},
];

