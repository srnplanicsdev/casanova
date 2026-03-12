export const handleCardPrice = (price) => {
    if (!price) return "-";
    return price.toLocaleString("es-ES", {
        style: "currency",
        currency: "EUR",
        minimumFractionDigits: 0,
    maximumFractionDigits: 0
    });
}