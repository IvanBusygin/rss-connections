import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function lettersDigitsSpacesValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const { value } = control;

    if (value && !/^[a-zA-Zа-яА-Я0-9\s]*$/.test(value)) {
      return { wrongLetters: 'Allowed only letters, digits or spaces' };
    }

    return null;
  };
}
