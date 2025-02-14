export const useCurrency = (amount, locale = "vi-VN", currency = "VND") =>{
    const formatCurrency = computed(() => {
        return new Intl.NumberFormat(locale, {
            style: 'currency',
            currency: currency,
        }).format(isRef(amount) ? amount.value : amount)
    })
    return {
        formatCurrency
    }
}