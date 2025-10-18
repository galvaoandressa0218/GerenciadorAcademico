
export interface Disciplina {
   id: number;
  nome: string;
  codigo: string;
  cargaHoraria: number;
  tipo: string;
  classificacao: string;
  descricao: string;
  ativo: boolean;
  ementa?: string;
  objetivos?: string[];
  conteudo?: string[];
  metodologia?: string[];
  avaliacao?: string[];
  expanded?: boolean;
  curso?: string;
}