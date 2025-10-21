export interface Disciplina {
  id?: number;
  nome: string;
  codigo: string; 
  cargaHoraria: number; 
  tipo: string;
  classificacao: string;
  ativo: boolean;
  
  descricao?: string; 
  curso?: string;     
  
  // Campos mock/auxiliares para a interface do programa
  ementa?: string; 
  objetivos?: string[] | string;
  conteudo?: string[] | string;
  metodologia?: string[] | string;
  avaliacao?: string[] | string;
  expanded?: boolean;
}