import { Component, EventEmitter, Output, inject, Input, OnInit } from '@angular/core';
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
export class PopUpAdicionarProfessorComponent implements OnInit {
  @Input() professorToEdit?: Professor | null;
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<Partial<Professor>>();

  private fb = inject(FormBuilder);
  public professorForm: FormGroup;

  constructor() {
    this.professorForm = this.fb.group({
      id: [null],
      nomeCompleto: ['', Validators.required],
      escolaVinculada: ['', Validators.required],
      numeroRegistro: ['', Validators.required],
      ativo: [true, Validators.required]
    });
  }

  ngOnInit(): void {
    if (this.professorToEdit) {
      this.professorForm.patchValue(this.professorToEdit); 
    }
  }

  onSave(): void {
    if (this.professorForm.valid) {
      this.save.emit(this.professorForm.value);
    }
  }

  onClose(): void {
    this.close.emit();
  }
}