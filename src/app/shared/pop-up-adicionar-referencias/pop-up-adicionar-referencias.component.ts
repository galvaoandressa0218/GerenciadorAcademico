import { Component, EventEmitter, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Referencia } from '../../features/core/model/referencias.model';

@Component({
  selector: 'app-pop-up-adicionar-referencia',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './pop-up-adicionar-referencias.component.html',
  styleUrls: ['./pop-up-adicionar-referencias.component.css']
})
export class PopUpAdicionarReferenciaComponent {
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<Partial<Referencia>>();

  private fb = inject(FormBuilder);
  public form: FormGroup;

  constructor() {
    this.form = this.fb.group({
      titulo: ['', Validators.required],
      autor: ['', Validators.required],
      edicao: [''],
      editora: [''],
      isbn: [''],
      tipo: ['Fisico', Validators.required],
      categoria: ['Basica', Validators.required],
      local: [''],
      url: ['']
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