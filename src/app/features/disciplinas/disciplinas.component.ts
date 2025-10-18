// CAMINHO: src/app/features/disciplinas/disciplinas.component.ts
// ARQUIVO COMPLETO PARA VERIFICAÇÃO

import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BotaoAdicionarComponent } from '../../shared/botao-adicionar/botao-adicionar.component';
import { PopUpComponent } from '../../shared/pop-up-forms/pop-up-forms.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DisciplinaService } from '../../features/core/services/disciplina.service';
import { DisciplinaTabela } from '../../features/core/model/materia.model';

@Component({
  selector: 'app-disciplinas',
  standalone: true,
  imports: [
    CommonModule, 
    BotaoAdicionarComponent,
    PopUpComponent,
    ReactiveFormsModule
  ],
  templateUrl: './disciplinas.component.html',
  styleUrls: ['./disciplinas.component.css']
})
export class DisciplinasComponent implements OnInit {
  private disciplinaService = inject(DisciplinaService);
  private fb = inject(FormBuilder);

  public disciplines = signal<DisciplinaTabela[]>([]);
  public isModalVisible = signal(false);
  public disciplinaForm: FormGroup;

  tiposDisciplina = ['EAD', 'PRESENCIAL'];
  classificacoesDisciplina = ['TEORICA', 'PRATICA', 'ESTAGIO'];

  constructor() {
    this.disciplinaForm = this.fb.group({
      sigla: ['', Validators.required],
      descricao: ['', Validators.required],
      carga_horaria: [null, [Validators.required, Validators.min(1)]],
      tipo: ['PRESENCIAL', Validators.required],
      classificacao: ['TEORICA', Validators.required]
    });
  }

  ngOnInit(): void {
    this.carregarDisciplinas();
  }

  carregarDisciplinas(): void {
    // PASSO 1: Esta é a linha onde o erro provavelmente está.
    // Verifique se a chamada abaixo é exatamente "this.disciplinaService.getDisciplinasParaTabela()"
    this.disciplinaService.getDisciplinasParaTabela().subscribe({
      next: (data) => {
        const disciplinasParaTabela: DisciplinaTabela[] = data.map(d => ({ ...d, expanded: false }));
        this.disciplines.set(disciplinasParaTabela);
      },
      error: (err) => console.error('Erro ao carregar disciplinas:', err)
    });
  }

  toggleExpand(disciplina: DisciplinaTabela): void {
    disciplina.expanded = !disciplina.expanded;
  }

  handleAddDiscipline(): void {
    this.disciplinaForm.reset({ tipo: 'PRESENCIAL', classificacao: 'TEORICA' });
    this.isModalVisible.set(true);
  }

  handleCloseModal(): void {
    this.isModalVisible.set(false);
  }

  handleSaveDiscipline(): void {
    if (this.disciplinaForm.invalid) {
      console.error('Formulário inválido!');
      return;
    }
    this.disciplinaService.criarDisciplina(this.disciplinaForm.value).subscribe({
      next: () => {
        this.handleCloseModal();
        this.carregarDisciplinas();
      },
      error: (err:any) => console.error('Erro ao salvar disciplina:', err)
    });
  }
}