import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { Store } from '@ngrx/store';
import { PeopleItemComponent } from 'people/components/people-item/people-item.component';
import { Conversations, People } from 'people/models/people.model';
import {
  conversationsAction,
  peopleAction,
  updatePeopleAction,
} from 'redux/actions/people.actions';
import {
  selectConversations,
  selectPeople,
  selectPeopleUpdatedAt,
} from 'redux/selectors/people.selectors';
import { Observable } from 'rxjs';
import { ButtonCountdownComponent } from 'shared/components/countdown-button/button-countdown.component';

@Component({
  selector: 'app-people',
  standalone: true,
  imports: [
    AsyncPipe,
    MatCardModule,
    MatListModule,
    PeopleItemComponent,
    MatButtonModule,
    MatBadgeModule,
    ButtonCountdownComponent,
  ],
  templateUrl: './people.component.html',
  styleUrl: './people.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PeopleComponent implements OnInit {
  private store = inject(Store);

  peopleList$: Observable<People[]> | undefined;

  conversationsList$: Observable<Conversations[]> | undefined;

  public updatedAt$: Observable<number> | undefined;

  ngOnInit() {
    this.store.dispatch(peopleAction());
    this.store.dispatch(conversationsAction());

    this.peopleList$ = this.store.select(selectPeople);

    this.conversationsList$ = this.store.select(selectConversations);

    this.updatedAt$ = this.store.select(selectPeopleUpdatedAt);
  }

  refreshData() {
    this.store.dispatch(updatePeopleAction());
  }
}
