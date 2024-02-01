import { NgClass } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  inject,
  Input,
  OnChanges,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { AuthService } from 'auth/services/auth.service';
import { IMessage } from 'group/models/dialog.model';
import { MessageComponent } from 'shared/components/message/message.component';

@Component({
  selector: 'app-messages',
  standalone: true,
  imports: [MessageComponent, NgClass],
  templateUrl: './messages.component.html',
  styleUrl: './messages.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MessagesComponent implements OnInit, OnChanges {
  @Input() messages!: IMessage[] | null;

  public myID!: string | undefined;

  private authService = inject(AuthService);

  private renderer = inject(Renderer2);

  @ViewChild('scrollContainer') scrollContainer: ElementRef | undefined;

  ngOnInit() {
    this.myID = this.authService.user.uid;
  }

  ngOnChanges() {
    setTimeout(() => {
      this.scrollToBottom();
    }, 10);
  }

  scrollToBottom(): void {
    if (this.scrollContainer) {
      const scrollContainerEl = this.scrollContainer.nativeElement;
      this.renderer.setProperty(scrollContainerEl, 'scrollTop', scrollContainerEl.scrollHeight);
    }
  }
}
