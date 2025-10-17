import { Component, OnInit, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router'; 

// Importa o componente de pop-up (reutilizável)
import { PopUpComponent } from '../../shared/pop-up-forms/pop-up-forms.component';

// Interface para estruturar os dados da disciplina
interface Disciplina {
  nome: string;
  codigo: string;
  secoes: Secao[];
}

// O tipo de conteúdo de cada seção
type ContentType = 'ementa' | 'objetivos' | 'conteudo' | 'metodologia' | 'avaliacao';

interface Secao {
  id: ContentType; // Identificador único para edição
  titulo: string;
  conteudo: string | string[]; // Pode ser texto ou uma lista
}

@Component({
  selector: 'app-detalhes-disciplina',
  standalone: true,
  imports: [CommonModule, PopUpComponent], // Inclui o PopUpComponent
  templateUrl: './detalhe-materias.component.html',
  styleUrls: ['./detalhe-materias.component.css']
})
export class DetalhesDisciplinaComponent implements OnInit {
  
  private route = inject(ActivatedRoute);

  // Armazena o ID da matéria vindo da rota (ex: /app/materia/5)
  materiaId: number | null = null;

  // Signal para controlar qual modal está aberto. Armazena o ID da seção.
  activeSectionId = signal<ContentType | null>(null);

  // Dados de mock para a tela (simulando a Arquitetura de Software)
  disciplina = signal<Disciplina>({
    nome: 'Arquitetura de Software',
    codigo: 'ARQS-20002',
    secoes: [
      {
        id: 'ementa',
        titulo: 'Ementa',
        conteudo: 'Estudo de princípios, estilos e padrões de arquitetura de software, abordando práticas para projetar sistemas escaláveis, robustos e de fácil manutenção.'
      },
      {
        id: 'objetivos',
        titulo: 'Objetivos',
        conteudo: [
          'Capacitar o aluno a compreender e aplicar conceitos de arquitetura de software.',
          'Desenvolver habilidades para selecionar e implementar padrões arquiteturais adequados.',
          'Promover a análise crítica de diferentes estilos arquiteturais frente às necessidades do projeto.'
        ]
      },
      {
        id: 'conteudo',
        titulo: 'Conteúdo programático',
        conteudo: [
          'Introdução à Arquitetura de Software',
          'Papéis e responsabilidades do arquiteto de software',
          'Estilos arquiteturais (camadas, cliente-servidor, orientado a serviços, microsserviços etc.)',
          'Padrões de arquiteturais (MVC, MVP, MVVM, entre outros)',
          'Documentação arquitetural',
          'Qualidade de software e atributos arquiteturais (desempenho, segurança, escalabilidade)',
          'Ferramentas de modelagem e boas práticas de arquitetura',
          'Estudos de caso e aplicações práticas',
        ]
      },
      {
        id: 'metodologia',
        titulo: 'Metodologia',
        conteudo: [
          'Aulas expositivas com apoio de recursos multimídia.',
          'Discussão de estudos de caso reais.',
          'Atividades práticas em laboratório com desenvolvimento de projetos.',
          'Trabalhos em grupo para análise crítica de arquiteturas.'
        ]
      },
      {
        id: 'avaliacao',
        titulo: 'Sistema de Avaliação',
        conteudo: [
          'Provas teóricas (40%)',
          'Trabalhos práticos (30%)',
          'Projetos em grupo (20%)',
          'Participação em sala e atividades complementares (10%)'
        ]
      }
    ]
  });

  ngOnInit(): void {
    // Captura o ID da matéria da URL (necessário para o contexto)
    this.route.params.subscribe(params => {
      this.materiaId = +params['id'];
      console.log(`Carregando detalhes da matéria ID: ${this.materiaId}`);
      // Aqui você faria a chamada ao serviço para carregar dados reais
    });
  }

  // Abre o modal de configuração para a seção específica
  openSettingsModal(id: ContentType): void {
    this.activeSectionId.set(id);
    // Aqui você também carregaria o conteúdo da seção para o pop-up
  }

  // Fecha o modal (usado pelo backdrop ou botão do modal)
  closeModal(): void {
    this.activeSectionId.set(null);
  }
  
  handleAdicionarPrograma(): void {
      console.log('Botão "Adicionar programa" clicado.');
  }

  // Lógica de Salvamento do Modal (opcional, dependendo de como o PopUpComponent emite)
  handleSave(updatedData: any): void {
    console.log(`Dados da seção ${this.activeSectionId()} salvos:`, updatedData);
    // Aqui você implementaria a lógica para atualizar a disciplina e chamar o serviço de backend
    this.closeModal();
  }
}
