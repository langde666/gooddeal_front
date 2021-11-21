export const formatPrice = (price) =>
    new Intl.NumberFormat('de-DE', { maximumSignificantDigits: 3 }).format(
        price,
    );
