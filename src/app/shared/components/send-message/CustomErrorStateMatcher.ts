import { ErrorStateMatcher } from '@angular/material/core';

export class CustomErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(): boolean {
    return false;
  }
}
