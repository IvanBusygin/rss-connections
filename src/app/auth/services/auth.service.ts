import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ILogin, ILoginResponse } from 'auth/models/login.model';
import { AuthUrl } from 'auth/services/urls';
import { IUserLocalData } from 'core/models/user-local.models';
import { clearAllCookies } from 'core/services/clearAllCookies';
import { PersistenceService } from 'core/services/persistence.service';
import { BehaviorSubject, Observable, tap } from 'rxjs';

import { environment } from '../../environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http: HttpClient = inject(HttpClient);

  private persisService: PersistenceService = inject(PersistenceService);

  public isAuth$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  login(loginFormData: ILogin): Observable<ILoginResponse> {
    return this.http.post<ILoginResponse>(AuthUrl.LOGIN, loginFormData).pipe(
      tap((res) => {
        this.persisService.set(environment.USER_TOKEN_KEY, res);
        this.persisService.set(environment.RS_EMAIL_KEY, loginFormData.email);
        this.isAuth$.next(true);
      }),
    );
  }

  get user() {
    const uidToken: IUserLocalData | null = this.persisService.get(environment.USER_TOKEN_KEY);
    const userEmail: string | null = this.persisService.get(environment.RS_EMAIL_KEY);
    if (uidToken?.token) {
      this.isAuth$.next(true);
    } else {
      this.isAuth$.next(false);
    }
    return { token: uidToken?.token ?? '', uid: uidToken?.uid ?? '', email: userEmail ?? '' };
  }

  logout() {
    return this.http.delete<never>(AuthUrl.LOGOUT).pipe(
      tap(() => {
        this.reset();
        clearAllCookies();
        this.isAuth$.next(false);
      }),
    );
  }

  reset() {
    this.persisService.remove(environment.USER_TOKEN_KEY);
    this.persisService.remove(environment.RS_EMAIL_KEY);
  }
}
