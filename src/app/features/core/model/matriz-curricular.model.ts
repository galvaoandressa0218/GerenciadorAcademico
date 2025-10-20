export interface DisciplinaDetalhada {
  id: number;
  nome: string;
  codigo: string;
  cargaHoraria: number;
  tipo: string;
  classificacao: string;
}

export interface Semestre {
  semestre: number;
  disciplinas: DisciplinaDetalhada[];
}

export interface MatrizCurricular {
  id: number;
  nomeMatriz: string;
  nomeCurso?: string;
  turno: string;
  campus: string;
  habilitacao: string;
  horasComplementares: number;
  semestres: Semestre[];
}

export interface MatrizCurricularSummary {
  id: number;
  nomeMatriz: string;
  habilitacao: string;
  campus: string;
  turno: string;
}