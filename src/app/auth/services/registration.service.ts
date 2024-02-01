import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { IRegistration } from 'auth/models/registration.model';
import { AuthUrl } from 'auth/services/urls';
import { showAlertAction } from 'redux/actions/app.actions';
import { BehaviorSubject, catchError, EMPTY, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RegistrationService {
  private http: HttpClient = inject(HttpClient);

  private store = inject(Store);

  public errorDuplication$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  getRegistration(regFormData: IRegistration): Observable<never> {
    return this.http.post<never>(AuthUrl.REGISTRATION, regFormData).pipe(
      tap(() => {
        this.store.dispatch(showAlertAction({ msg: 'Registration is successfully', option: 'ok' }));
      }),
      catchError((err) => {
        if (err.error.type === 'PrimaryDuplicationException') {
          this.errorDuplication$.next(true);
        }
        this.store.dispatch(showAlertAction({ msg: err.error.message, option: 'fail' }));
        return EMPTY;
      }),
    );
  }
}
