import { Routes } from '@angular/router';
import { LoginPageComponent } from 'auth/pages/login-page/login-page.component';
import { RegistrationPageComponent } from 'auth/pages/registration-page/registration-page.component';
import { ConversationPageComponent } from 'conversation/pages/conversation.page/conversation.page.component';
import { authGuard } from 'core/guards/auth.guard';
import { notAuthGuard } from 'core/guards/not-auth.guard';
import { MainPageComponent } from 'core/pages/main-page/main-page.component';
import { NotFoundComponent } from 'core/pages/not-found/not-found.component';
import { GroupDialogPageComponent } from 'group/pages/group-dialog-page/group-dialog-page.component';
import { ProfilePageComponent } from 'profile/pages/profile-page/profile-page.component';

export const routes: Routes = [
  {
    path: '',
    component: MainPageComponent,
    pathMatch: 'full',
    canActivate: [authGuard],
  },
  {
    path: 'signin',
    component: LoginPageComponent,
    canActivate: [notAuthGuard],
  },
  {
    path: 'signup',
    component: RegistrationPageComponent,
    canActivate: [notAuthGuard],
  },
  {
    path: 'profile',
    component: ProfilePageComponent,
    canActivate: [authGuard],
  },
  {
    path: 'group/:groupID',
    component: GroupDialogPageComponent,
    canActivate: [authGuard],
  },
  {
    path: 'conversation/:conversationID',
    component: ConversationPageComponent,
    canActivate: [authGuard],
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];
