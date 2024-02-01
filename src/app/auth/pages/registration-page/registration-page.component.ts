import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterLink } from '@angular/router';
import { RegistrationComponent } from 'auth/components/registration/registration.component';

@Component({
  selector: 'app-registration-page',
  standalone: true,
  imports: [RegistrationComponent, MatToolbarModule, MatCardModule, MatButtonModule, RouterLink],
  templateUrl: './registration-page.component.html',
  styleUrl: './registration-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegistrationPageComponent {}
