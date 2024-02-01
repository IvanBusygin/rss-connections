import { ChangeDetectionStrategy, Component, inject, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { Router } from '@angular/router';
import { AuthService } from 'auth/services/auth.service';
import { ModalGroupsDeleteComponent } from 'groups/components/modal-groups-delete/modal-groups-delete.component';
import { Groups } from 'groups/models/groups.model';

@Component({
  selector: 'app-group-item',
  standalone: true,
  imports: [MatListModule, MatIconModule, MatButtonModule],
  templateUrl: './group-item.component.html',
  styleUrl: './group-item.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GroupItemComponent {
  @Input() item!: Groups;

  private router: Router = inject(Router);

  private authService = inject(AuthService);

  private dialog = inject(MatDialog);

  openModal() {
    this.dialog.open(ModalGroupsDeleteComponent, {
      data: { groupID: this.item?.id },
    });
  }

  onClick() {
    this.router.navigate(['./group', this.item?.id]);
  }

  get isOwnGroup() {
    return this.item.createdBy === this.authService.user.uid;
  }
}
