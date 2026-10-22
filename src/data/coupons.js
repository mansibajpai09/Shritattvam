const coupons = [
  {
    code: 'SHRITATTVAM10',
    type: 'percentage',
    value: 10,
  },
  {
    code: 'WELCOME100',
    type: 'fixed',
    value: 100,
  },
]

export function validateCoupon(code) {
  const normalizedCode = code.trim().toUpperCase()

  return coupons.find(
    (coupon) => coupon.code === normalizedCode
  ) || null
}