import { AsyncPipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { RegistrationService } from 'auth/services/registration.service';
import { lettersAndSpacesValidator } from 'core/validators/letters-and-spaces.validator';
import matchPasswords from 'core/validators/match-passwords.validator';
import PasswordStrengthValidator from 'core/validators/password-strength.validator';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    HttpClientModule,
    AsyncPipe,
  ],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegistrationComponent implements OnInit {
  private fb: FormBuilder = inject(FormBuilder);

  private regService: RegistrationService = inject(RegistrationService);

  private router: Router = inject(Router);

  private destroyRef = inject(DestroyRef);

  public regForm!: FormGroup;

  public isSubmitDisabled$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  private previousEmail: string[] = [];

  ngOnInit() {
    this.initForm();
    this.setupFormListeners();
  }

  initForm(): void {
    this.regForm = this.fb.group(
      {
        name: ['', [Validators.required, Validators.maxLength(40), lettersAndSpacesValidator()]],
        email: ['', [Validators.required, Validators.email]],
        password: [null, [Validators.required, PasswordStrengthValidator()]],
        confirmPassword: ['', [Validators.required]],
      },
      { validators: matchPasswords() },
    );
  }

  get name() {
    return this.regForm.get('name');
  }

  get email() {
    return this.regForm.get('email');
  }

  get password() {
    return this.regForm.get('password');
  }

  get confirmPassword() {
    return this.regForm.get('confirmPassword');
  }

  setupFormListeners(): void {
    this.regForm.valueChanges.subscribe((form) => {
      this.isSubmitDisabled$.next(false);

      if (this.previousEmail?.includes(form.email)) {
        this.email?.setErrors({ emailTaken: true });
      }
    });

    this.regService.errorDuplication$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((condition) => {
        if (condition) {
          this.email?.setErrors({ emailTaken: true });
          this.isSubmitDisabled$.next(true);
        }
      });
  }

  onSubmit() {
    if (this.regForm.valid) {
      this.isSubmitDisabled$.next(true);

      this.previousEmail?.push(this.regForm.value.email);

      const { confirmPassword, ...formData } = this.regForm.value;
      this.regService
        .getRegistration(formData)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe(() => {
          this.router.navigate(['./signin']);
        });
    }
  }
}
