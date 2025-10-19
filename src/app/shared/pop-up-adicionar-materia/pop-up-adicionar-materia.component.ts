import { Component, EventEmitter, Output, inject, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Disciplina } from '../../features/core/model/disciplina.model';

@Component({
  selector: 'app-pop-up-adicionar-materia',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './pop-up-adicionar-materia.component.html',
  styleUrls: ['./pop-up-adicionar-materia.component.css']
})
export class PopUpAdicionarMateriaComponent implements OnInit {
  @Input() disciplinaToEdit?: Disciplina | null;
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<Partial<Disciplina>>();

  private fb = inject(FormBuilder);

  public disciplinaForm: FormGroup;
  public tiposDisciplina = ['PRESENCIAL', 'EAD'];
  public classificacoesDisciplina = ['TEORICA', 'PRATICA', 'ESTAGIO'];

  constructor() {
    this.disciplinaForm = this.fb.group({
      id: [null],
      descricao: ['', Validators.required],
      sigla: ['', Validators.required],
      cargaHoraria: [60, [Validators.required, Validators.min(1)]],
      tipo: [this.tiposDisciplina[0], Validators.required],
      classificacao: [this.classificacoesDisciplina[0], Validators.required],
    });
  }

  ngOnInit(): void {
    if (this.disciplinaToEdit) {
      this.disciplinaForm.patchValue({
        id: this.disciplinaToEdit.id,
        descricao: this.disciplinaToEdit.descricao,
        sigla: this.disciplinaToEdit.codigo,
        cargaHoraria: this.disciplinaToEdit.cargaHoraria,
        tipo: this.disciplinaToEdit.tipo,
        classificacao: this.disciplinaToEdit.classificacao
      });
    }
  }

  onSave(): void {
    if (this.disciplinaForm.valid) {
      this.save.emit(this.disciplinaForm.value);
    }
  }

  onClose(): void {
    this.close.emit();
  }
}