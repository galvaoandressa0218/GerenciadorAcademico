import { Component, EventEmitter, Output, inject } from '@angular/core';
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
export class PopUpAdicionarMateriaComponent {
  // Eventos que serão enviados para o componente pai
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<Partial<Disciplina>>();

  private fb = inject(FormBuilder);
  
  public disciplinaForm: FormGroup;
  public tiposDisciplina = ['PRESENCIAL', 'EAD'];
  public classificacoesDisciplina = ['TEORICA', 'PRATICA', 'ESTAGIO'];

  constructor() {
    this.disciplinaForm = this.fb.group({
      nome: ['', Validators.required],
      codigo: ['', Validators.required],
      curso: ['Bes', Validators.required],
      cargaHoraria: [60, [Validators.required, Validators.min(1)]],
      tipo: [this.tiposDisciplina[0], Validators.required],
      classificacao: [this.classificacoesDisciplina[0], Validators.required],
      descricao: ['']
    });
  }

  onSave(): void {
    if (this.disciplinaForm.valid) {
      // Emite o evento 'save' com os dados do formulário
      this.save.emit(this.disciplinaForm.value);
    } else {
      console.error('Formulário inválido');
    }
  }

  onClose(): void {
    // Emite o evento 'close'
    this.close.emit();
  }
}