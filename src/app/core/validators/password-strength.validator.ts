import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export default function PasswordStrengthValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const { value } = control;

    if (!value) {
      return null;
    }

    const basicRegex =
      /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.*[!"'#$%`()*+,-./:;<>=?@[\]^&_{\\|}~])(?=.{8,})/;
    const specialRegex = /[!"'#$%`()*+,-.:;<>=?@[\]^&_{\\/|}~]/;
    const upperRegex = /[A-Z]/;
    const lowerRegex = /[a-z]/;
    const numberRegex = /[0-9]/;
    const spaceRegex = /[ ]/;

    if (spaceRegex.test(value)) return { invalidPassword: 'The password must not contain a space' };

    if (!upperRegex.test(value))
      return { invalidPassword: 'Password does not include upper case characters' };

    if (!lowerRegex.test(value))
      return { invalidPassword: 'Password does not include lower case characters' };

    if (!numberRegex.test(value))
      return { invalidPassword: 'The password does not include a number' };

    if (!specialRegex.test(value))
      return { invalidPassword: 'Add special characters: !@#$%^&*()-_+=,.:;<>?[]{}"\'|\\/~' };

    if (value.length < 8) return { invalidPassword: 'Minimum length 8 characters' };

    if (!basicRegex.test(value)) return { invalidPassword: 'Incorrect password' };

    return null;
  };
}
