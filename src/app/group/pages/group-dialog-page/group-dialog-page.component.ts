import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthService } from 'auth/services/auth.service';
import { SendMessageDialogComponent } from 'group/components/send-message-dialog/send-message-dialog.component';
import { IMessage } from 'group/models/dialog.model';
import { ModalGroupsDeleteComponent } from 'groups/components/modal-groups-delete/modal-groups-delete.component';
import { groupAction, updateGroupAction } from 'redux/actions/group.actions';
import { groupsAction } from 'redux/actions/groups.actions';
import { peopleAction } from 'redux/actions/people.actions';
import { selectDialog, selectGroupUpdatedAt } from 'redux/selectors/group.selectors';
import { selectGroups } from 'redux/selectors/groups.selectors';
import { map, Observable } from 'rxjs';
import { ButtonCountdownComponent } from 'shared/components/countdown-button/button-countdown.component';
import { MessagesComponent } from 'shared/components/messages/messages.component';

@Component({
  selector: 'app-group-dialog-page',
  standalone: true,
  imports: [
    AsyncPipe,
    MatButtonModule,
    RouterLink,
    MatIconModule,
    ButtonCountdownComponent,
    MessagesComponent,
    MatCardModule,
    SendMessageDialogComponent,
  ],
  templateUrl: './group-dialog-page.component.html',
  styleUrl: './group-dialog-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GroupDialogPageComponent implements OnInit {
  public route: ActivatedRoute = inject(ActivatedRoute);

  private store = inject(Store);

  public groupID: string | undefined;

  public groupName$: Observable<string | undefined> | undefined;

  public groupsDialog$: Observable<IMessage[]> | undefined;

  public updatedAt$: Observable<number | undefined> | undefined;

  public currentGroupIsMy$: Observable<boolean | undefined> | undefined;

  private dialog = inject(MatDialog);

  private authService = inject(AuthService);

  ngOnInit() {
    this.store.dispatch(groupsAction());
    this.store.dispatch(peopleAction());

    this.route.params.subscribe((params) => {
      this.groupID = params['groupID'];

      if (this.groupID) {
        this.store.dispatch(groupAction({ groupID: this.groupID }));
        this.groupsDialog$ = this.store.select(selectDialog);
        this.updatedAt$ = this.store.select(selectGroupUpdatedAt);
      }
    });

    this.currentGroupIsMy$ = this.store.select(selectGroups).pipe(
      map((groups) => groups.find((group) => group.id === this.groupID)),
      map((g) => {
        return g?.createdBy === this.authService.user.uid;
      }),
    );

    this.groupName$ = this.store.select(selectGroups).pipe(
      map((groups) => groups.find((group) => group.id === this.groupID)),
      map((g) => g?.name),
    );
  }

  deleteModal() {
    this.dialog.open(ModalGroupsDeleteComponent, {
      data: { groupID: this.groupID },
    });
  }

  refreshData() {
    if (this.groupID) {
      this.store.dispatch(updateGroupAction({ groupID: this.groupID }));
    }
  }
}
