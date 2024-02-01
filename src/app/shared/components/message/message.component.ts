import { AsyncPipe, DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, Input, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Store } from '@ngrx/store';
import { IMessage } from 'group/models/dialog.model';
import { selectPeople } from 'redux/selectors/people.selectors';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'app-message',
  standalone: true,
  imports: [MatCardModule, DatePipe, AsyncPipe],
  templateUrl: './message.component.html',
  styleUrl: './message.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MessageComponent implements OnInit {
  @Input() message!: IMessage | null;

  @Input() isOwn!: boolean;

  private store = inject(Store);

  authorName$: Observable<string | undefined> | undefined;

  ngOnInit() {
    this.authorName$ = this.store.select(selectPeople).pipe(
      map((people) => people.find((p) => p.uid === this.message?.authorID)),
      map((u) => u?.name),
    );
  }
}
