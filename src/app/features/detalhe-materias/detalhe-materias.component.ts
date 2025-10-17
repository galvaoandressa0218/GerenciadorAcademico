import { Component } from '@angular/core';

// Interfaces para tipar nossos dados (boa prática!)
interface Disciplina {
  nome: string;
  codigo: string;
  ementa: string;
  objetivos: string[];
  conteudo: string[];
  metodologia: string[];
  avaliacao: string[];
}

@Component({
  selector: 'app-detalhe-materias',
  templateUrl: './detalhe-materias.component.html',
  styleUrls: ['./detalhe-materias.component.scss']
})
export class DetalheMateriasComponent {

  // Todos os dados da disciplina ficam aqui
  disciplina: Disciplina = {
    nome: 'Arquitetura de Sofware',
    codigo: 'ARQS-20002',
    ementa: 'Estudo de princípios, estilos e padrões de arquitetura de software, abordando práticas para projetar sistemas escaláveis, robustos e de fácil manutenção.',
    objetivos: [
      'Capacitar o aluno a compreender e aplicar conceitos de arquitetura de software.',
      'Desenvolver habilidades para selecionar e implementar padrões arquiteturais adequados.',
      'Promover a análise crítica de diferentes estilos arquiteturais frente às necessidades do projeto.'
    ],
    conteudo: [
      'Introdução à Arquitetura de Software',
      'Papéis e responsabilidades do arquiteto de software',
      'Estilos arquiteturais (camadas, cliente-servidor, orientado a serviços, microsserviços etc.)',
      'Padrões de arquitetura (MVC, MVP, MVVM, entre outros)',
      'Documentação arquitetural',
      'Qualidade de software e atributos arquiteturais (desempenho, segurança, escalabilidade)',
      'Ferramentas de modelagem e boas práticas de arquitetura',
      'Estudos de caso e aplicações práticas'
    ],
    metodologia: [
      'Aulas expositivas com apoio de recursos multimídia.',
      'Discussão de estudos de caso reais.',
      'Atividades práticas em laboratório com desenvolvimento de projetos.',
      'Trabalhos em grupo para análise crítica de arquiteturas.'
    ],
    avaliacao: [
      'Provas teóricas (40%)',
      'Trabalhos práticos (30%)',
      'Projetos em grupo (20%)',
      'Participação em sala e atividades complementares (10%)'
    ]
  };

  constructor() { }

  /**
   * Abre o pop-up de formulário para editar uma seção específica.
   * @param secao O identificador da seção a ser editada (ex: 'ementa', 'objetivos').
   */
  abrirModal(secao: string): void {
    console.log(`Abrir pop-up para editar a seção: ${secao}`);
    // AQUI você chamaria seu serviço de Modal/Dialog, passando a 'secao' como parâmetro
    // Ex: this.modalService.open(FormComponent, { data: { secao: secao, dados: this.disciplina[secao] } });
  }

  /**
   * Lógica para o botão 'Adicionar programa'.
   */
  adicionarPrograma(): void {
    console.log('Botão "Adicionar programa" clicado!');
  }
}