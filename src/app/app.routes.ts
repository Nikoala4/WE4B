import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RoutesComponent } from './routes/routes.component';
import { HomeComponent } from './home/home.component';
import { connectedGuard } from './guards/connected.guard';
import { disconnectedGuard } from './guards/disconnected.guard';
import { RedirectBlankComponent } from './redirectblank/redirectblank.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ProfileComponent } from './profile/profile.component';
import { BaseComponent } from './base-component/base-component.component';
import { SettingsComponent } from './settings/settings.component';
import { AccountSettingsComponent } from './settings/account-settings/account-settings.component';
import { ProfileAccountSettingsComponent } from './settings/account-settings/profile-accounts-settings/profile-accounts-settings.component';
import { AccountInformationComponent } from './settings/account-settings/account-information/account-information.component';

export const routes: Routes = [
    {path:'login', component: LoginComponent, canActivate: [disconnectedGuard]},
    {path:'forgot-password', component: ForgotPasswordComponent, canActivate: [disconnectedGuard]},
    {path:'routes', component: RoutesComponent, canActivate: [connectedGuard]},
    {path:'', component:BaseComponent, canActivate: [connectedGuard], children: [
        {path:'', component: HomeComponent, canActivate: [connectedGuard]},
        {path:'redirect', component:RedirectBlankComponent},
        {path:'profile', component: ProfileComponent, canActivate: [connectedGuard]},
        {path:'profile/:userId', component: ProfileComponent, canActivate: [connectedGuard]},
        {path:'settings', component: SettingsComponent, canActivate: [connectedGuard], children: [
            {path:'account', component: AccountSettingsComponent, canActivate: [connectedGuard], children: [
                {path:'profile', component: ProfileAccountSettingsComponent, canActivate: [connectedGuard]},
                {path:'infos', component: AccountInformationComponent, canActivate: [connectedGuard]}
            ]},
        ]},
    ]},
];

