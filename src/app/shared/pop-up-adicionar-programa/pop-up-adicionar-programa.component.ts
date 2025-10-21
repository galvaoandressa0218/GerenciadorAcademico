import { Component, EventEmitter, Output, inject, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProgramaService } from '../../features/core/services/programa.service';
import { Programa } from '../../features/core/model/programa.model';

@Component({
  selector: 'app-pop-up-adicionar-programa',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './pop-up-adicionar-programa.component.html',
  styleUrls: ['./pop-up-adicionar-programa.component.css']
})
export class PopUpAdicionarProgramaComponent implements OnInit {
  @Input() idDisciplina!: number;
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<Programa>();

  private fb = inject(FormBuilder);
  public programaForm: FormGroup;

  constructor() {
    this.programaForm = this.fb.group({
      idDisciplina: [null, Validators.required],
      ementa: ['', Validators.required],
      objetivos: ['', Validators.required],
      conteudo_programatico: ['', Validators.required],
      metodologia: ['', Validators.required],
      sistema_avaliacao: ['', Validators.required],
      ativo: [true]
    });
  }

  ngOnInit(): void {
    if (this.idDisciplina) {
      this.programaForm.patchValue({ idDisciplina: this.idDisciplina });
    }
  }

  onSave(): void {
    if (this.programaForm.valid) {
      this.save.emit(this.programaForm.value);
    }
  }

  onClose(): void {
    this.close.emit();
  }
}