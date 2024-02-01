import { AsyncPipe, DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Store } from '@ngrx/store';
import { logoutAction } from 'redux/actions/auth.actions';
import { getProfileAction } from 'redux/actions/profile.actions';
import { selectProfile, selectProfileIsLoading } from 'redux/selectors/profile.selectors';
import { Observable } from 'rxjs';

import { ProfileComponent } from '../../components/profile/profile.component';
import { IProfile } from '../../models/profile.model';

@Component({
  selector: 'app-profile-page',
  standalone: true,
  imports: [ProfileComponent, AsyncPipe, DatePipe, MatCardModule, MatButtonModule],
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfilePageComponent implements OnInit {
  private readonly store = inject(Store);

  public userProfile$: Observable<IProfile | null> | undefined;

  public isLoading$: Observable<boolean> | undefined;

  ngOnInit() {
    this.store.dispatch(getProfileAction());

    this.userProfile$ = this.store.select(selectProfile);

    this.isLoading$ = this.store.select(selectProfileIsLoading);
  }

  logout() {
    this.store.dispatch(logoutAction());
  }
}
