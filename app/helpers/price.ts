import { Product } from "@prisma/client";

export const calculateProduct = (product: Product): number => {
  // If the product has no discount, return the original price
  if (product.discountPercentage === 0) {
    return Number(product.price);
  }

  const discount = Number(product.price) * (product.discountPercentage / 100);

  return Number(product.price) - discount;
};

/**
 * Formata um valor numérico como uma string de moeda no formato brasileiro (BRL).
 *
 * @param value - O valor numérico a ser formatado.
 * @returns Uma string representando o valor formatado como moeda brasileira.
 */
export const formatCurrency = (value: number): string => {
  return Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
  }).format(value);
};
