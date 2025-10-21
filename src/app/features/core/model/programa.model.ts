export interface Programa {
  id?: number;
  ementa: string;
  objetivos: string;
  conteudo_programatico: string; 
  metodologia: string;
  sistema_avaliacao: string; 
  ativo: boolean;

  // IDs de relacionamentos retornados no DTO de resposta do BE
  disciplina_ids?: number[]; 
  professores_ids?: number[];
  referencia_ids?: number[];
  bloqueado?: boolean;
  professor_bloqueador_id?: number; 
}