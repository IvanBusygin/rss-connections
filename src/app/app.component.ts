import { CommonModule, DOCUMENT } from '@angular/common';
import { Component, Inject, inject, OnInit, Renderer2 } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleChange, MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from 'auth/services/auth.service';
import { PersistenceService } from 'core/services/persistence.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    RouterLink,
    MatSlideToggleModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  private authService = inject(AuthService);

  private persistenceService = inject(PersistenceService);

  public isAuth$: BehaviorSubject<boolean> | undefined;

  private darkClassName = 'dark-theme';

  public theme: boolean = false;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2,
  ) {}

  ngOnInit() {
    this.isAuth$ = this.authService.isAuth$;

    this.theme = JSON.parse(this.persistenceService.get(this.darkClassName) ?? '') as boolean;
    this.mode(this.theme);
  }

  switchMode({ checked }: MatSlideToggleChange) {
    this.mode(checked);
  }

  mode(mode: boolean) {
    if (mode) {
      this.renderer.addClass(this.document.body, this.darkClassName);
      this.persistenceService.set(this.darkClassName, true);
    } else {
      this.persistenceService.set(this.darkClassName, false);
      this.renderer.removeClass(this.document.body, this.darkClassName);
    }
  }
}
