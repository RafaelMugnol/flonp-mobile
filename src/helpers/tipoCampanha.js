export const enumTipoCampanha = {
  SIMPLES: 0,
  QUANTIDADES_MIN_MAX: 1,
  LEVE_PAGUE: 2,
};


export function tipoCampanhaDescricao(unidade) {
  switch (unidade) {
    case enumTipoCampanha.SIMPLES: return 'Simples';
    case enumTipoCampanha.QUANTIDADES_MIN_MAX: return 'Qtde. Min/Max';
    case enumTipoCampanha.LEVE_PAGUE: return 'Leve X/Pague Y';
    default: return '';
  }
}
