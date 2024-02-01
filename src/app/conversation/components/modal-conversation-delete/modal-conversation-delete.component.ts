import { Component, Inject, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { Store } from '@ngrx/store';
import { deleteConversationAction } from 'redux/actions/people.actions';

@Component({
  selector: 'app-modal-conversation-delete',
  standalone: true,
  imports: [
    MatButtonModule,
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatDialogTitle,
    MatIconModule,
  ],
  templateUrl: './modal-conversation-delete.component.html',
  styleUrl: './modal-conversation-delete.component.scss',
})
export class ModalConversationDeleteComponent {
  private refModal = inject(MatDialogRef<ModalConversationDeleteComponent>);

  private store = inject(Store);

  constructor(@Inject(MAT_DIALOG_DATA) public data: { conversationID: string }) {}

  delete() {
    this.store.dispatch(deleteConversationAction({ conversationID: this.data.conversationID }));
    this.refModal.close();
  }
}
