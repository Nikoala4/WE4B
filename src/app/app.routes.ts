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
import { ProfileAccountSettingsComponent } from './settings/profile-accounts-settings/profile-accounts-settings.component';
import { AccountInformationComponent } from './settings/account-information/account-information.component';
import { AccountModifyPasswordComponent } from './settings/account-modify-password/account-modify-password.component';
import { DecorationShopComponent } from './settings/decoration-shop/decoration-shop.component';
import { BadgesShopComponent } from './settings/badges-shop/badges-shop.component';

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
            {path:'account/profile', component: ProfileAccountSettingsComponent, canActivate: [connectedGuard]},
            {path:'account/infos', component: AccountInformationComponent, canActivate: [connectedGuard]},
            {path:'account/password', component: AccountModifyPasswordComponent, canActivate: [connectedGuard]},


            {path:'shop/decorations', component: DecorationShopComponent, canActivate: [connectedGuard]},
            {path:'shop/badges', component: BadgesShopComponent, canActivate: [connectedGuard]}
        ]},
    ]},
];

