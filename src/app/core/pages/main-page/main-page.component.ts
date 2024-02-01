import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { GroupsComponent } from 'groups/components/groups/groups.component';
import { PeopleComponent } from 'people/components/people/people.component';

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [GroupsComponent, PeopleComponent, MatDividerModule],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainPageComponent {}
