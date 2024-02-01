import { AsyncPipe, NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Conversations, People } from 'people/models/people.model';
import { newConversationsAction } from 'redux/actions/people.actions';

@Component({
  selector: 'app-people-item',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, MatListModule, NgClass, AsyncPipe],
  templateUrl: './people-item.component.html',
  styleUrl: './people-item.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PeopleItemComponent {
  @Input() item!: People;

  @Input() companions!: Conversations[] | null;

  private store = inject(Store);

  private router: Router = inject(Router);

  onClick() {
    const comp = this.companions?.find((c) => c.companionID === this.item.uid);
    if (comp) {
      this.router.navigate(['./conversation', comp.id]);
    } else {
      this.store.dispatch(newConversationsAction({ companionID: this.item.uid }));
    }
  }

  get isCompanion() {
    return this.companions?.some((companion) => companion.companionID === this.item.uid);
  }
}
