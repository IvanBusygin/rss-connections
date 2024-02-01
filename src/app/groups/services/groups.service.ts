import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

import {
  Groups,
  IGroupResponse,
  IRequestNewGroup,
  IResponseNewGroup,
} from '../models/groups.model';
import { GroupUrl } from './urls';

@Injectable({
  providedIn: 'root',
})
export class GroupsService {
  private http: HttpClient = inject(HttpClient);

  getGroupsList(): Observable<Groups[]> {
    return this.http.get<IGroupResponse>(GroupUrl.LIST).pipe(
      map((data) => data.Items),
      map((items) => {
        return items.map((item) => {
          const group = {
            createdAt: item.createdAt.S,
            id: item.id.S,
            createdBy: item.createdBy.S,
            name: item.name.S,
          };
          return group;
        });
      }),
    );
  }

  createGroup(body: IRequestNewGroup): Observable<IResponseNewGroup> {
    return this.http.post<IResponseNewGroup>(GroupUrl.CREATE, body);
  }

  deleteGroup(groupID: string): Observable<never> {
    const params: HttpParams = new HttpParams().set('groupID', groupID);
    return this.http.delete<never>(GroupUrl.DELETE, { params });
  }
}
