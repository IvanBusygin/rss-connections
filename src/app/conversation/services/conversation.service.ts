import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import {
  IConversationResponse,
  IMessage,
  MessageRequest,
} from 'conversation/models/conversation.model';
import { map, Observable } from 'rxjs';

import { ConversationUrl } from './urls';

@Injectable({
  providedIn: 'root',
})
export class ConversationService {
  private http: HttpClient = inject(HttpClient);

  getConversationList(conversationID: string, since?: string): Observable<IMessage[]> {
    let params = new HttpParams().set('conversationID', conversationID);

    if (since) {
      params = params.set('since', since);
    }

    return this.http.get<IConversationResponse>(ConversationUrl.READ, { params }).pipe(
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

  sendMessageConversation(body: MessageRequest): Observable<never> {
    return this.http.post<never>(ConversationUrl.SEND, body);
  }

  deleteConversation(conversationID: string): Observable<never> {
    const params = new HttpParams().set('conversationID', conversationID);

    return this.http.delete<never>(ConversationUrl.DELETE, { params });
  }
}
