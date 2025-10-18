export interface Materia {
  id: number;
  nome: string;
  codigo: string; // <-- ADICIONADO
  curso: string;
  cargaHoraria: number;
  tipo: string;
  classificacao: string;
  descricao: string; // <-- ADICIONADO
}

// Este é o tipo que o componente usará na tabela, com o controle de estado 'expanded'
export interface Disciplina extends Materia {
  expanded: boolean; // Controle de expansão da linha
}