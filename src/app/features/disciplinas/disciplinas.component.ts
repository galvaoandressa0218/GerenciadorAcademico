import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BotaoAdicionarComponent } from '../../shared/botao-adicionar/botao-adicionar.component';
import { PopUpComponent } from '../../shared/pop-up-forms/pop-up-forms.component'; // Importar o pop-up
import { Disciplina } from '.././core/model/disciplina.model';
import { DisciplinaService } from '.././core/services/disciplina.service';

@Component({
  selector: 'app-disciplinas',
  standalone: true,
  imports: [
    CommonModule,
    BotaoAdicionarComponent,
    PopUpComponent, // Adicionar o pop-up aos imports
    ReactiveFormsModule // Adicionar o módulo de formulários reativos
  ],
  templateUrl: './disciplinas.component.html',
  styleUrls: ['./disciplinas.component.css']
})
export class DisciplinasComponent implements OnInit {
  private disciplinaService = inject(DisciplinaService);
  private fb = inject(FormBuilder); // Injetar o FormBuilder

  public disciplines = signal<Disciplina[]>([]);
  public isLoading = signal(true);
  
  // Lógica do Modal e Formulário
  public isModalVisible = signal(false);
  public disciplinaForm: FormGroup;
  public tiposDisciplina = ['EAD', 'PRESENCIAL'];
  public classificacoesDisciplina = ['TEORICA', 'PRATICA', 'ESTAGIO'];

  constructor() {
    // Inicializar o formulário
    this.disciplinaForm = this.fb.group({
      nome: ['', Validators.required],
      codigo: ['', Validators.required],
      cargaHoraria: [null, [Validators.required, Validators.min(1)]],
      tipo: [this.tiposDisciplina[0], Validators.required],
      classificacao: [this.classificacoesDisciplina[0], Validators.required],
      descricao: ['']
    });
  }

  ngOnInit(): void {
    this.disciplinaService.getDisciplinas().subscribe({
      next: (data: Disciplina[]) => {
        this.disciplines.set(data.map(d => ({ ...d, expanded: false })));
        this.isLoading.set(false);
      },
      error: (err: any) => {
        console.error('Erro ao carregar disciplinas:', err);
        this.isLoading.set(false);
      }
    });
  }

  // Métodos para controlar o modal
  openModalToAdd(): void {
    this.disciplinaForm.reset({
        tipo: this.tiposDisciplina[0],
        classificacao: this.classificacoesDisciplina[0]
    });
    this.isModalVisible.set(true);
  }

  handleCloseModal(): void {
    this.isModalVisible.set(false);
  }

  handleSaveDiscipline(): void {
    if (this.disciplinaForm.valid) {
      console.log('Salvando disciplina:', this.disciplinaForm.value);
      // Aqui você chamaria o serviço para criar a disciplina
      // this.disciplinaService.criarDisciplina(this.disciplinaForm.value).subscribe(...)
      this.handleCloseModal();
    } else {
      console.error('Formulário inválido');
    }
  }

  toggleExpand(discipline: Disciplina): void {
    discipline.expanded = !discipline.expanded;
  }
}