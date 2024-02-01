import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export default function matchPasswords(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');

    if (!password || !confirmPassword || password.value === confirmPassword.value) {
      return null;
    }

    confirmPassword.setErrors({ mismatchedPasswords: true });

    return { mismatchedPasswords: "Passwords don't match" };
  };
}
