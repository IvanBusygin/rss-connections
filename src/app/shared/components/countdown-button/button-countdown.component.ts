import { AsyncPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { interval, map, Observable, startWith, switchMap, take } from 'rxjs';

@Component({
  selector: 'app-button-countdown',
  standalone: true,
  imports: [MatButtonModule, MatBadgeModule, AsyncPipe, MatIconModule],
  templateUrl: './button-countdown.component.html',
  styleUrl: './button-countdown.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonCountdownComponent implements OnInit {
  @Input() title!: string;

  @Input() updatedAt$!: Observable<number | undefined> | undefined;

  @Output() clickEvent = new EventEmitter();

  public timeLef$: Observable<number> | undefined;

  ngOnInit() {
    if (this.updatedAt$) {
      this.timeLef$ = this.updatedAt$.pipe(
        switchMap((updateTimestamp) => {
          return interval(1000).pipe(
            take(60),
            startWith(Date.now()),
            map(() => Date.now()),
            map((currentTime) => Math.floor((currentTime - (updateTimestamp ?? 0)) / 1000)),
            map((elapsedTime) => 60 - elapsedTime),
          );
        }),
      );
    }
  }

  onClick() {
    this.clickEvent.emit();
  }
}
