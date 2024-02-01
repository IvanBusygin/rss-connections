import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IDialogResponse, IMessage, MessageRequest } from 'group/models/dialog.model';
import { map, Observable } from 'rxjs';

import { GroupDialogUrl } from './urls';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  private http: HttpClient = inject(HttpClient);

  getDialogList(groupID: string, since: string): Observable<IMessage[]> {
    let params = new HttpParams().set('groupID', groupID);

    if (since) {
      params = params.set('since', since);
    }

    return this.http.get<IDialogResponse>(GroupDialogUrl.READ, { params }).pipe(
      map((data) => data.Items),
      map((items) => {
        return items.map((item) => ({
          authorID: item.authorID.S,
          createdAt: item.createdAt.S,
          message: item.message.S,
        }));
      }),
      map((items) =>
        items.sort((a, b) => {
          return Number(a.createdAt) - Number(b.createdAt);
        }),
      ),
    );
  }

  sendMessage(body: MessageRequest): Observable<never> {
    return this.http.post<never>(GroupDialogUrl.SEND, body);
  }
}
