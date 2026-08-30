function ProductFeatures({ features = [] }) {
  return (
    <ul className="space-y-3">
      {features.map((feature) => (
        <li
          key={feature}
          className="flex items-center gap-3 text-sm text-stone-700"
        >
          <span className="text-[#b77a27]">
            ◇
          </span>

          <span>{feature}</span>
        </li>
      ))}
    </ul>
  )
}

export default ProductFeatures