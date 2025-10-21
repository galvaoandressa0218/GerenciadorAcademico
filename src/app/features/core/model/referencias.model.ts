export interface Referencia {
  id: number;
  titulo: string;
  autor: string;
  tipo: 'FISICO' | 'DIGITAL'; 
  edicao: string;
  categoria: 'BASICA' | 'COMPLEMENTAR'; 
  imagemUrl: string;
  local: string;
  editora: string;
  ano: number;
  isbn: string;
  url?: string;
  programa_id?: number;
}