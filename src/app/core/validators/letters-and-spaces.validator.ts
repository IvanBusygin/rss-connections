import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function lettersAndSpacesValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const { value } = control;

    if (value && !/^[a-zA-Zа-яА-Я\s]*$/.test(value)) {
      return { wrongLetters: 'Allowed only letters or spaces' };
    }

    return null;
  };
}
