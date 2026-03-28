type Options = {
  currency?: string
  locales?: string
}

export const formatCurrency = (amount: number, options?: Options) => {
  return new Intl.NumberFormat(options?.locales || 'id-ID', {
    style: 'decimal',
    currency: options?.currency || 'IDR',
    minimumFractionDigits: 0,
  }).format(amount)
}
