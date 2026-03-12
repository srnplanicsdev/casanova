export const handleCardPrice = (price) => {
  if (price == null) return "—"; 
  return price.toLocaleString('es-ES', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  });
};
