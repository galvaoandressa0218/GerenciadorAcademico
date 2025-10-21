import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DisciplinaService } from '.././core/services/disciplina.service';
import { Disciplina } from '.././core/model/disciplina.model';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { PopUpComponent } from '../../shared/pop-up-formsSimples/pop-up-forms.component';
import { PopUpAdicionarProgramaComponent } from '../../shared/pop-up-adicionar-programa/pop-up-adicionar-programa.component';
import { ProgramaService, Programa } from '../core/services/programa.service';

@Component({
  selector: 'app-detalhe-materias',
  standalone: true,
  imports: [CommonModule, FormsModule, PopUpComponent, PopUpAdicionarProgramaComponent],
  templateUrl: './detalhe-materias.component.html',
  styleUrls: ['./detalhe-materias.component.scss']
})
export class DetalheMateriasComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private disciplinaService = inject(DisciplinaService);
  private programaService = inject(ProgramaService);

  public disciplina = signal<Disciplina | null>(null);
  public isLoading = signal(true);
  public error = signal<string | null>(null);

  public isModalVisible = signal(false);
  public modalTitle = signal('');
  public modalContent = signal('');
  private currentSection = signal('');

  public isProgramaModalVisible = signal(false);

  ngOnInit(): void {
    const dadoMockado: Disciplina = {
      id: 1,
      nome: 'Arquitetura de Software',
      codigo: 'COMP-123',
      cargaHoraria: 68,
      tipo: 'PRESENCIAL',
      classificacao: 'TEORICA',
      descricao: 'Estudo dos padrões e estruturas para desenvolvimento de sistemas robustos.',
      ativo: true,
      ementa: 'Conceitos fundamentais de arquitetura de software, estilos arquiteturais, padrões de projeto e documentação de arquitetura.',
      objetivos: ['Capacitar o aluno a compreender e aplicar conceitos de arquitetura.', 'Desenvolver habilidades para selecionar padrões adequados.'],
      conteudo: ['Introdução à Arquitetura de Software', 'Estilos arquiteturais (camadas, cliente-servidor, etc.)', 'Padrões de Projeto (GoF)'],
      metodologia: ['Aulas expositivas com apoio de recursos multimídia.', 'Discussão de estudos de caso reais.'],
      avaliacao: ['Provas teóricas (40%)', 'Trabalhos práticos (30%)', 'Projetos em grupo (30%)']
    };
    this.disciplina.set(dadoMockado);
    this.isLoading.set(false);
  }

  abrirModal(secao: string, conteudo: string | string[]): void {
    this.modalTitle.set(`Editar ${secao}`);
    this.modalContent.set(Array.isArray(conteudo) ? conteudo.join('\n') : conteudo);
    this.currentSection.set(secao.toLowerCase().replace(' ', '_'));
    this.isModalVisible.set(true);
  }

  fecharModal(): void {
    this.isModalVisible.set(false);
  }

  salvarAlteracoes(): void {
    const sectionToUpdate = this.currentSection();
    const newContent = this.modalContent();
    this.disciplina.update(currentDisciplina => {
      if (!currentDisciplina) return null;

      const updatedDisciplina = { ...currentDisciplina };
      
      const isArrayField = ['objetivos', 'conteudo', 'metodologia', 'avaliacao'].includes(sectionToUpdate);
      (updatedDisciplina as any)[sectionToUpdate] = isArrayField ? newContent.split('\n') : newContent;
      
      return updatedDisciplina;
    });

    console.log(`Salvando [${sectionToUpdate}]:`, newContent);
    this.fecharModal();
  }

  adicionarPrograma(): void {
    this.isProgramaModalVisible.set(true);
  }

  closeProgramaModal(): void {
    this.isProgramaModalVisible.set(false);
  }

  handleSavePrograma(programaData: Programa): void {
    this.programaService.create(programaData).subscribe({
      next: (novoPrograma) => {
        console.log('Programa salvo com sucesso:', novoPrograma);
        this.closeProgramaModal();
      },
      error: (err) => {
        console.error('Erro ao salvar programa:', err);
      }
    });
  }
}