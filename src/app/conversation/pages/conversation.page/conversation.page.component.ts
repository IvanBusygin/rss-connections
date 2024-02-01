import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { ModalConversationDeleteComponent } from 'conversation/components/modal-conversation-delete/modal-conversation-delete.component';
import { SendMessageConversationComponent } from 'conversation/components/send-message-conversation/send-message-conversation.component';
import { ConversationService } from 'conversation/services/conversation.service';
import { IMessage } from 'group/models/dialog.model';
import { conversationAction, updateConversationAction } from 'redux/actions/conversation.actions';
import { conversationsAction, peopleAction } from 'redux/actions/people.actions';
import {
  selectConversation,
  selectConversationUpdatedAt,
} from 'redux/selectors/conversation.selectors';
import { selectConversations, selectPeople } from 'redux/selectors/people.selectors';
import { combineLatest, map, Observable } from 'rxjs';
import { ButtonCountdownComponent } from 'shared/components/countdown-button/button-countdown.component';
import { MessagesComponent } from 'shared/components/messages/messages.component';

@Component({
  selector: 'app-conversation.page',
  standalone: true,
  imports: [
    AsyncPipe,
    ButtonCountdownComponent,
    MatButtonModule,
    MatIconModule,
    RouterLink,
    MessagesComponent,
    SendMessageConversationComponent,
    MatCardModule,
  ],
  templateUrl: './conversation.page.component.html',
  styleUrl: './conversation.page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConversationPageComponent implements OnInit {
  public route: ActivatedRoute = inject(ActivatedRoute);

  private store = inject(Store);

  private dialog = inject(MatDialog);

  private conversationService = inject(ConversationService);

  public conversationMessage$: Observable<IMessage[]> | undefined;

  public updatedAt$: Observable<number | undefined> | undefined;

  public peopleName$: Observable<string | undefined> | undefined;

  public conversationID: string | undefined;

  list$: Observable<unknown> | undefined;

  ngOnInit() {
    this.store.dispatch(conversationsAction());
    this.store.dispatch(peopleAction());

    this.route.params.subscribe((params) => {
      this.conversationID = params['conversationID'];
    });

    if (this.conversationID) {
      this.store.dispatch(conversationAction({ conversationID: this.conversationID }));
      this.conversationMessage$ = this.store.select(selectConversation);
      this.updatedAt$ = this.store.select(selectConversationUpdatedAt);
      this.list$ = this.conversationService.getConversationList(this.conversationID);
    }

    this.peopleName$ = combineLatest(
      this.store.select(selectPeople),
      this.store.select(selectConversations),
    ).pipe(
      map(([people, conversations]) => {
        const companion = conversations.find((i) => i.id === this.conversationID);
        return people.find((i) => i.uid === companion?.companionID)?.name;
      }),
    );
  }

  deleteModal() {
    this.dialog.open(ModalConversationDeleteComponent, {
      data: { conversationID: this.conversationID },
    });
  }

  refreshData() {
    if (this.conversationID) {
      this.store.dispatch(updateConversationAction({ conversationID: this.conversationID }));
    }
  }
}
