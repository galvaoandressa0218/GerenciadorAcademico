import { Component, EventEmitter, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-organizar-matriz',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './organizar-matriz.component.html',
  styleUrls: ['./organizar-matriz.component.css']
})
export class OrganizarMatrizComponent {
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<any>();

  private fb = inject(FormBuilder);
  public form: FormGroup;

  constructor() {
    this.form = this.fb.group({
      disciplina: ['', Validators.required],
      semestre: ['', Validators.required],
      preRequisito: [''],
    });
  }

  onSave(): void {
    if (this.form.valid) {
      this.save.emit(this.form.value);
    }
  }

  onClose(): void {
    this.close.emit();
  }
}