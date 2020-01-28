export const enumUnidades = {
  UNITARIO: 1,
  QUILOGRAMA: 2,
  GRAMA: 3,
  LITRO: 4,
  MILILITRO: 5,
  METRO: 6,
};


export function unidadeAbreviada(unidade) {
  switch (unidade) {
    case enumUnidades.UNITARIO: return 'Un';
    case enumUnidades.QUILOGRAMA: return 'Kg';
    case enumUnidades.GRAMA: return 'g';
    case enumUnidades.LITRO: return 'L';
    case enumUnidades.MILILITRO: return 'mL';
    case enumUnidades.METRO: return 'm';
    default: return '';
  }
}
