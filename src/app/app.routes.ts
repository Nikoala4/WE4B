import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RoutesComponent } from './components/routes/routes.component';
import { HomeComponent } from './components/home/home.component';
import { connectedGuard } from './guards/connected.guard';
import { disconnectedGuard } from './guards/disconnected.guard';
import { RedirectBlankComponent } from './components/redirectblank/redirectblank.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { ProfileComponent } from './components/profile/profile.component';
import { BaseComponent } from './components/base-component/base-component.component';
import { SettingsComponent } from './components/settings/settings.component';
import { ProfileAccountSettingsComponent } from './components/settings/profile-accounts-settings/profile-accounts-settings.component';
import { AccountInformationComponent } from './components/settings/account-information/account-information.component';
import { AccountModifyPasswordComponent } from './components/settings/account-modify-password/account-modify-password.component';
import { DecorationShopComponent } from './components/settings/decoration-shop/decoration-shop.component';
import { BadgesShopComponent } from './components/settings/badges-shop/badges-shop.component';
import { ClassComponent } from './components/class/class.component';
import { ClassUsersComponent } from './components/class-users/class-users.component';
import { ProfileEditorComponent } from './components/profile-editor/profile-editor.component';
import { adminGuard } from './guards/admin.guard';
import { DecorationBuilderComponent } from './components/settings/decoration-builder/decoration-builder.component';

export const routes: Routes = [
    {path:'login', component: LoginComponent, canActivate: [disconnectedGuard]},
    {path:'forgot-password', component: ForgotPasswordComponent, canActivate: [disconnectedGuard]},
    {path:'routes', component: RoutesComponent, canActivate: [connectedGuard]},
    {path:'', component:BaseComponent, canActivate: [connectedGuard], children: [
        {path:'redirect', component:RedirectBlankComponent},

        {path:'', component: HomeComponent, canActivate: [connectedGuard]},

        {path:'profile', component: ProfileComponent, canActivate: [connectedGuard]},
        {path:'profile/:userId', component: ProfileComponent, canActivate: [connectedGuard]},
        {path:'profile/:userId/edit', component: ProfileEditorComponent, canActivate: [adminGuard]},

        {path:'class/:classId', component: ClassComponent, canActivate: [connectedGuard]},
        {path:'class/:classId/users', component: ClassUsersComponent, canActivate: [connectedGuard]},

        {path:'settings', component: SettingsComponent, canActivate: [connectedGuard], children: [
            {path:'account/profile', component: ProfileAccountSettingsComponent, canActivate: [connectedGuard]},
            {path:'account/infos', component: AccountInformationComponent, canActivate: [connectedGuard]},
            {path:'account/password', component: AccountModifyPasswordComponent, canActivate: [connectedGuard]},

            {path:'shop/decorations', component: DecorationShopComponent, canActivate: [connectedGuard]},
            {path:'shop/badges', component: BadgesShopComponent, canActivate: [connectedGuard]},
            {path:'shop/decoration-builder', component: DecorationBuilderComponent, canActivate: [adminGuard]}
        ]},
    ]},
];

