import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Store } from '@ngrx/store';
import { lettersDigitsSpacesValidator } from 'core/validators/letters-digit-spaces.validator';
import { createGroupAction } from 'redux/actions/groups.actions';

@Component({
  selector: 'app-modal-new-group',
  standalone: true,
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatButtonModule,
    MatDialogClose,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    AsyncPipe,
  ],
  templateUrl: './modal-new-group.component.html',
  styleUrl: './modal-new-group.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalNewGroupComponent implements OnInit {
  private fb: FormBuilder = inject(FormBuilder);

  private refModal = inject(MatDialogRef<ModalNewGroupComponent>);

  private store = inject(Store);

  public form!: FormGroup;

  ngOnInit() {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(30), lettersDigitsSpacesValidator()]],
    });
  }

  get name() {
    return this.form.get('name');
  }

  onSubmit() {
    if (this.form.valid) {
      this.store.dispatch(
        createGroupAction({ name: this.form.value.name, closeModal: () => this.refModal.close() }),
      );
    }
  }
}
