import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ProfileUrl } from 'profile/services/urls';
import { map, Observable } from 'rxjs';

import { IProfile, IProfileResponse, IRequestName } from '../models/profile.model';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private http: HttpClient = inject(HttpClient);

  getProfile(): Observable<IProfile> {
    return this.http.get<IProfileResponse>(ProfileUrl.PROFILE).pipe(
      map((profileRes) => {
        const profile = {
          email: profileRes.email.S,
          name: profileRes.name.S,
          uid: profileRes.uid.S,
          createdAt: profileRes.createdAt.S,
        };
        return profile;
      }),
    );
  }

  upDateProfileName(data: IRequestName): Observable<never> {
    return this.http.put<never>(ProfileUrl.PROFILE, data);
  }
}
