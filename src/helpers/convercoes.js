export function formataNumero(valor, casasDecimais) {
  if (!casasDecimais)
    casasDecimais = 0;

  return parseFloat(valor).toFixed(casasDecimais).replace('.', ',');
}

export function formataPreco(valor) {
  return `R$ ${formataNumero(valor, 2)}`;
}


export function formataData(data) {
  if (data == null)
    return '-';

  if (typeof (data) === 'string')
    data = new Date(data);

  return `${data.getDate().toString().padStart(2, '0')}/${
    (data.getMonth() + 1).toString().padStart(2, '0')}/${
    data.getFullYear()}`;
}
