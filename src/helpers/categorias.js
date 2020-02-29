export const enumCategorias = {
  GERAL: 0,
  ALIMENTOS: 1,
  BEBIDAS: 2,
  HORTIFRUTI: 3,
  PADARIA: 4,
  FRIOS: 5,
  CONGELADOS: 6,
  ACOUGUE: 7,
  LIMPEZA: 8,
  HIGIENE: 9,
  DOCES: 10,
};


export function categoriaDescricao(unidade) {
  switch (unidade) {
    case enumCategorias.GERAL: return 'Geral';
    case enumCategorias.ALIMENTOS: return 'Alimentos';
    case enumCategorias.BEBIDAS: return 'Bebidas';
    case enumCategorias.HORTIFRUTI: return 'Hortifruti';
    case enumCategorias.PADARIA: return 'Padaria';
    case enumCategorias.FRIOS: return 'Frios';
    case enumCategorias.CONGELADOS: return 'Congelados';
    case enumCategorias.ACOUGUE: return 'Açougue';
    case enumCategorias.LIMPEZA: return 'Limpeza';
    case enumCategorias.HIGIENE: return 'Higiene';
    case enumCategorias.DOCES: return 'Doces';
    default: return '';
  }
}
