import { AsyncPipe, DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, Input, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { Store } from '@ngrx/store';
import { EditableProfileNameFieldComponent } from 'profile/components/editable-profile-name-field/editable-profile-name-field.component';
import { upDateProfileNameAction } from 'redux/actions/profile.actions';
import { selectProfileIsLoading } from 'redux/selectors/profile.selectors';
import { Observable } from 'rxjs';

import { IProfile } from '../../models/profile.model';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    DatePipe,
    AsyncPipe,
    MatCardModule,
    EditableProfileNameFieldComponent,
    MatFormFieldModule,
    MatProgressBarModule,
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileComponent implements OnInit {
  @Input() userProfile!: IProfile | null;

  private readonly store = inject(Store);

  public profileIsLoading$: Observable<boolean | undefined> | undefined;

  ngOnInit() {
    this.profileIsLoading$ = this.store.select(selectProfileIsLoading);
  }

  onSubmitEdit(newText: string) {
    this.store.dispatch(upDateProfileNameAction({ name: newText }));
  }
}
