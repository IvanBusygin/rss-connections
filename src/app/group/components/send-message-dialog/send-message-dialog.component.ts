import { ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Store } from '@ngrx/store';
import { sendMessageGroupAction } from 'redux/actions/group.actions';
import { selectCurrentGroupID } from 'redux/selectors/group.selectors';
import { SendMessageComponent } from 'shared/components/send-message/send-message.component';

@Component({
  selector: 'app-send-message-dialog',
  standalone: true,
  imports: [SendMessageComponent],
  templateUrl: './send-message-dialog.component.html',
  styleUrl: './send-message-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SendMessageDialogComponent implements OnInit {
  private groupID!: string;

  private destroyRef = inject(DestroyRef);

  private store = inject(Store);

  ngOnInit() {
    this.store
      .select(selectCurrentGroupID)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((id) => {
        this.groupID = id;
      });
  }

  sendMsg(text: string) {
    this.store.dispatch(sendMessageGroupAction({ groupID: this.groupID, message: text }));
  }
}
