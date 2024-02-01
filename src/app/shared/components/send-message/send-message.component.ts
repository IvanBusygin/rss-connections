import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  inject,
  OnInit,
  Output,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { CustomErrorStateMatcher } from 'shared/components/send-message/CustomErrorStateMatcher';

@Component({
  selector: 'app-send-message',
  standalone: true,
  imports: [
    FormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    ReactiveFormsModule,
  ],
  templateUrl: './send-message.component.html',
  styleUrl: './send-message.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SendMessageComponent implements OnInit {
  @Output() sendMessage: EventEmitter<string> = new EventEmitter<string>();

  private fb: FormBuilder = inject(FormBuilder);

  public form!: FormGroup;

  public customErrorStateMatcher = new CustomErrorStateMatcher();

  ngOnInit() {
    this.form = this.fb.group({
      msg: ['', [Validators.required]],
    });
  }

  submit() {
    if (this.form.valid) {
      this.sendMessage.emit(this.form.value.msg);
      this.form.setValue({ msg: '' });
    }
  }
}
