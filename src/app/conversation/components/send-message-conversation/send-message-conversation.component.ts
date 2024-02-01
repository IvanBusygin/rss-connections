import { ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Store } from '@ngrx/store';
import { sendMessageConversationAction } from 'redux/actions/conversation.actions';
import { selectCurrentConversationID } from 'redux/selectors/conversation.selectors';
import { SendMessageComponent } from 'shared/components/send-message/send-message.component';

@Component({
  selector: 'app-send-message-conversation',
  standalone: true,
  imports: [SendMessageComponent],
  templateUrl: './send-message-conversation.component.html',
  styleUrl: './send-message-conversation.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SendMessageConversationComponent implements OnInit {
  private conversationID!: string;

  private destroyRef = inject(DestroyRef);

  private store = inject(Store);

  ngOnInit() {
    this.store
      .select(selectCurrentConversationID)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((id) => {
        this.conversationID = id;
      });
  }

  sendMsg(text: string) {
    this.store.dispatch(
      sendMessageConversationAction({ conversationID: this.conversationID, message: text }),
    );
  }
}
