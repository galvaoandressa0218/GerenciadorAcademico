export interface Professor {
  id: number;
  nomeCompleto: string; 
  numeroRegistro: number; 
  escolaVinculada: string;
  dataCadastro: string; 
  ativo: boolean;
  programa_ids?: number[];
}