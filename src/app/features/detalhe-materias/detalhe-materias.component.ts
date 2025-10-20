import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // 1. IMPORTAR FormsModule
import { DisciplinaService } from '.././core/services/disciplina.service';
import { Disciplina } from '.././core/model/disciplina.model';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

// 2. IMPORTAR O COMPONENTE DO POP-UP
import { PopUpComponent } from '../../shared/pop-up-formsSimples/pop-up-forms.component';

@Component({
  selector: 'app-detalhe-materias',
  standalone: true, // Adicionar standalone: true
  imports: [CommonModule, FormsModule, PopUpComponent], // 3. ADICIONAR IMPORTS
  templateUrl: './detalhe-materias.component.html',
  styleUrls: ['./detalhe-materias.component.scss']
})
export class DetalheMateriasComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private disciplinaService = inject(DisciplinaService);

  public disciplina = signal<Disciplina | null>(null);
  public isLoading = signal(true);
  public error = signal<string | null>(null);

  // 4. SINAIS PARA CONTROLAR O MODAL
  public isModalVisible = signal(false);
  public modalTitle = signal('');
  public modalContent = signal('');
  private currentSection = signal(''); // Para saber qual campo salvar

  ngOnInit(): void {
    this.route.paramMap.pipe(
      switchMap(params => {
        const id = params.get('id');
        if (id) {
          return this.disciplinaService.getDisciplinaById(Number(id));
        }
        this.error.set('ID da matéria é inválido.');
        this.isLoading.set(false);
        return of(null);
      })
    ).subscribe({
      next: (data) => {
        if (data) {
          // Simulando dados mais completos para exibição
          this.disciplina.set({
            ...data,
            objetivos: ['Capacitar o aluno a compreender e aplicar conceitos de arquitetura de software.', 'Desenvolver habilidades para selecionar e implementar padrões arquiteturais adequados.'],
            conteudo: ['Introdução à Arquitetura de Software', 'Papéis e responsabilidades do arquiteto de software', 'Estilos arquiteturais (camadas, cliente-servidor, etc.)'],
            metodologia: ['Aulas expositivas com apoio de recursos multimídia.', 'Discussão de estudos de caso reais.'],
            avaliacao: ['Provas teóricas (40%)', 'Trabalhos práticos (30%)', 'Projetos em grupo (20%)']
          });
        }
        this.isLoading.set(false);
      },
      error: (err) => {
        this.error.set('Não foi possível carregar os detalhes da disciplina.');
        this.isLoading.set(false);
        console.error(err);
      }
    });
  }

  // 5. FUNÇÕES PARA MANIPULAR O MODAL
  abrirModal(secao: string, conteudo: string | string[]): void {
    this.modalTitle.set(`Editar ${secao}`);
    // Se o conteúdo for um array, junta com quebras de linha para edição no textarea
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

      // Lógica para atualizar o campo correto
      const updatedDisciplina = { ...currentDisciplina };
      
      // Converte o texto de volta para array se necessário
      const isArrayField = ['objetivos', 'conteudo', 'metodologia', 'avaliacao'].includes(sectionToUpdate);
      (updatedDisciplina as any)[sectionToUpdate] = isArrayField ? newContent.split('\n') : newContent;
      
      return updatedDisciplina;
    });

    // Aqui você chamaria o serviço para salvar as alterações no backend
    // Ex: this.disciplinaService.atualizarDisciplina(this.disciplina().id, { [sectionToUpdate]: newContent }).subscribe(...)

    console.log(`Salvando [${sectionToUpdate}]:`, newContent);
    this.fecharModal();
  }

  adicionarPrograma(): void {
    console.log('Botão "Adicionar programa" clicado!');
  }
}