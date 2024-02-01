import { ChangeDetectionStrategy, Component, Inject, inject } from '@angular/core';
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
import { deleteGroupsAction } from 'redux/actions/groups.actions';

@Component({
  selector: 'app-groups-confirm',
  standalone: true,
  imports: [
    MatDialogTitle,
    MatButtonModule,
    MatDialogActions,
    MatDialogClose,
    MatIconModule,
    MatDialogContent,
  ],
  templateUrl: './modal-groups-delete.component.html',
  styleUrl: './modal-groups-delete.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalGroupsDeleteComponent {
  private refModal = inject(MatDialogRef<ModalGroupsDeleteComponent>);

  private store = inject(Store);

  constructor(@Inject(MAT_DIALOG_DATA) public data: { groupID: string }) {}

  delete() {
    this.store.dispatch(deleteGroupsAction({ groupID: this.data.groupID }));
    this.refModal.close();
  }
}
