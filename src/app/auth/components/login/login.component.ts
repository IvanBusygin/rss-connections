import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Store } from '@ngrx/store';
import { ILogin } from 'auth/models/login.model';
import { loginAction } from 'redux/actions/auth.actions';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatButtonModule, MatInputModule, AsyncPipe],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit {
  private fb: FormBuilder = inject(FormBuilder);

  private store = inject(Store);

  public loginForm!: FormGroup;

  public isSubmitButtonDisabled$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  ngOnInit() {
    this.initForm();
    this.setupFormListeners();
  }

  initForm(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: [null, [Validators.required]],
    });
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  setupFormListeners(): void {
    this.loginForm.valueChanges.subscribe(() => {
      this.isSubmitButtonDisabled$.next(false);
    });
  }

  onSubmit() {
    this.isSubmitButtonDisabled$.next(true);

    if (this.loginForm.valid) {
      const formData: ILogin = this.loginForm.value;

      this.store.dispatch(loginAction(formData));
    }
  }
}
