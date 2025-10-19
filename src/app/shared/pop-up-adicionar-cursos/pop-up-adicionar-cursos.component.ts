import { Component, EventEmitter, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Curso } from '../../features/core/model/curso.model';

@Component({
  selector: 'app-pop-up-adicionar-curso',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './pop-up-adicionar-cursos.component.html',
  styleUrls: ['./pop-up-adicionar-cursos.component.css']
})
export class PopUpAdicionarCursoComponent {
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<Omit<Curso, 'id'>>();

  private fb = inject(FormBuilder);
  public cursoForm: FormGroup;

  constructor() {
    this.cursoForm = this.fb.group({
      nome: ['', Validators.required],
      turno: ['', Validators.required],
      campus: ['', Validators.required],
      habilitacao: ['', Validators.required],
      ch: [null, [Validators.required, Validators.min(1)]]
    });
  }

  onSave(): void {
    if (this.cursoForm.valid) {
      this.save.emit(this.cursoForm.value);
    }
  }

  onClose(): void {
    this.close.emit();
  }
}