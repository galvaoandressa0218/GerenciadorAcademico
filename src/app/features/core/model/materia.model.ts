export interface Materia {
  id: number;
  nome: string;
  codigo: string; 
  curso: string;
  cargaHoraria: number;
  tipo: string;
  classificacao: string;
  descricao: string; 
}

export interface Disciplina extends Materia {
  expanded: boolean;
}