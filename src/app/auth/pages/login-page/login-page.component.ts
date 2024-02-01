import { HttpClientModule } from '@angular/common/http';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterLink } from '@angular/router';
import { LoginComponent } from 'auth/components/login/login.component';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [
    LoginComponent,
    HttpClientModule,
    RouterLink,
    MatButtonModule,
    MatCardModule,
    MatToolbarModule,
    MatToolbarModule,
  ],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginPageComponent {}
