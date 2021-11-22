export const formatPrice = (price) =>
    new Intl.NumberFormat('de-DE').format(price);
