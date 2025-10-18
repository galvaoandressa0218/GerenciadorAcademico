export interface Professor {
  id: number;
  nomeCompleto: string;
  numeroRegistro: number;
  escolaVinculada: string;
  ativo: boolean;
  dataCadastro?: string; // Exemplo
}