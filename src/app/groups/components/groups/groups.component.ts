import { AsyncPipe, DecimalPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { Store } from '@ngrx/store';
import { GroupItemComponent } from 'groups/components/group-item/group-item.component';
import { ModalNewGroupComponent } from 'groups/components/modal-new-group/modal-new-group.component';
import { Groups } from 'groups/models/groups.model';
import { groupsAction, updateGroupsAction } from 'redux/actions/groups.actions';
import { selectGroups, selectUpdatedAt } from 'redux/selectors/groups.selectors';
import { Observable } from 'rxjs';
import { ButtonCountdownComponent } from 'shared/components/countdown-button/button-countdown.component';

@Component({
  selector: 'app-groups',
  standalone: true,
  imports: [
    AsyncPipe,
    MatListModule,
    GroupItemComponent,
    MatCardModule,
    DecimalPipe,
    MatButtonModule,
    MatBadgeModule,
    ButtonCountdownComponent,
    MatIconModule,
  ],
  templateUrl: './groups.component.html',
  styleUrl: './groups.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GroupsComponent implements OnInit {
  private store = inject(Store);

  private dialog = inject(MatDialog);

  public groupsList$: Observable<Groups[] | null> | undefined;

  public updatedAt$: Observable<number> | undefined;

  ngOnInit() {
    this.store.dispatch(groupsAction());

    this.groupsList$ = this.store.select(selectGroups);

    this.updatedAt$ = this.store.select(selectUpdatedAt);
  }

  openModal() {
    this.dialog.open(ModalNewGroupComponent);
  }

  refreshData() {
    this.store.dispatch(updateGroupsAction());
  }
}
