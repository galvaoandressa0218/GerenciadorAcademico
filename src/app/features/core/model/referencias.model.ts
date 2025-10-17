// Esta interface será a "única fonte da verdade"
export interface Referencia {
  id: number;
  titulo: string;
  autor: string;
  tipo: 'Fisico' | 'Digital';
  edicao: string;
  categoria: 'Basica' | 'Complementar';
  imagemUrl: string;
  tituloCompleto: string;
  local: string;
  editora: string;
  ano: number;
  isbn: string;
  link?: string;
}
