import { AsyncPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  inject,
  Input,
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
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Store } from '@ngrx/store';
import { lettersAndSpacesValidator } from 'core/validators/letters-and-spaces.validator';
import { selectProfileIsLoading } from 'redux/selectors/profile.selectors';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-editable-profile-name-field',
  standalone: true,
  imports: [
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    ReactiveFormsModule,
    FormsModule,
    AsyncPipe,
  ],
  templateUrl: './editable-profile-name-field.component.html',
  styleUrl: './editable-profile-name-field.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditableProfileNameFieldComponent implements OnInit {
  private fb: FormBuilder = inject(FormBuilder);

  private readonly store = inject(Store);

  public isLoading$: Observable<boolean> | undefined;

  @Input() textValue: string = 'a';

  @Output() submitEdit: EventEmitter<string> = new EventEmitter<string>();

  public isEditState = false;

  public form!: FormGroup;

  ngOnInit() {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(40), lettersAndSpacesValidator()]],
    });

    this.isLoading$ = this.store.select(selectProfileIsLoading);
  }

  get name() {
    return this.form.get('name');
  }

  edit() {
    this.isEditState = true;
    this.form.setValue({ name: this.textValue });
  }

  onSubmit() {
    if (this.form.valid) {
      this.isEditState = false;
      this.submitEdit.emit(this.form.value.name);
    }
  }

  cancel() {
    this.isEditState = false;
  }
}
