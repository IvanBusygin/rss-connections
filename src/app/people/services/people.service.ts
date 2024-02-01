import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthService } from 'auth/services/auth.service';
import { map, Observable } from 'rxjs';

import {
  Conversations,
  IConversationsResponse,
  IPeopleResponse,
  IRequestNewConversations,
  IResponseNewConversations,
  People,
} from '../models/people.model';
import { PeopleUrl } from './urls';

@Injectable({
  providedIn: 'root',
})
export class PeopleService {
  private http: HttpClient = inject(HttpClient);

  private store = inject(Store);

  private authService = inject(AuthService);

  getPeopleList(): Observable<People[]> {
    const { uid } = this.authService.user;

    return this.http.get<IPeopleResponse>(PeopleUrl.USERS).pipe(
      map((data) => data.Items),
      map((items) => {
        return items.map((item) => ({
          name: item.name.S,
          uid: item.uid.S,
        }));
      }),
      map((people) => people.filter((item) => item.uid !== uid)),
    );
  }

  getConversationsList(): Observable<Conversations[]> {
    return this.http.get<IConversationsResponse>(PeopleUrl.CONVERSATIONS_LIST).pipe(
      map((data) => data.Items),
      map((items) => {
        return items.map((item) => ({
          companionID: item.companionID.S,
          id: item.id.S,
        }));
      }),
    );
  }

  createsConversations(body: IRequestNewConversations): Observable<IResponseNewConversations> {
    return this.http.post<IResponseNewConversations>(PeopleUrl.CONVERSATIONS_CREATE, body);
  }
}
