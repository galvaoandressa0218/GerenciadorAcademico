import { Component, EventEmitter, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Professor } from '../../features/core/model/professor.model';

@Component({
  selector: 'app-pop-up-adicionar-professor',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './pop-up-adicionar-professor.component.html',
  styleUrls: ['./pop-up-adicionar-professor.component.css']
})
export class PopUpAdicionarProfessorComponent {
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<Partial<Professor>>();

  private fb = inject(FormBuilder);
  public professorForm: FormGroup;

  constructor() {
    this.professorForm = this.fb.group({
      nome_completo: ['', Validators.required],
      escola_vinculada: ['', Validators.required],
      numero_registro: ['', Validators.required],
    });
  }

  onSave(): void {
    if (this.professorForm.valid) {
      this.save.emit(this.professorForm.value);
    } else {
      console.error('Formulário de professor inválido');
    }
  }

  onClose(): void {
    this.close.emit();
  }
}