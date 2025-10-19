export interface Referencia {
  id: number;
  titulo: string;
  autor: string;
  tipo: 'Fisico' | 'Digital';
  edicao: string;
  categoria: 'Basica' | 'Complementar';
  imagemUrl: string;
  local: string;
  editora: string;
  ano: number;
  isbn: string;
  url?: string;
}