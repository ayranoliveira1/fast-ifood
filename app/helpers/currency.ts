/**
 * Formata um valor numérico como uma string de moeda no formato brasileiro (BRL).
 *
 * @param value - O valor numérico a ser formatado.
 * @returns Uma string representando o valor formatado como moeda brasileira.
 */
//
export const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
};
