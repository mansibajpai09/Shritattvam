
const RelatedProductCard = ({ product }) => {
  return (
    <article className="group min-w-[190px] flex-1">
      <div className="relative aspect-square overflow-hidden rounded-lg bg-[#f5eee4]">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
      </div>

      <h3 className="mt-3 text-sm text-stone-800">
        {product.name}
      </h3>

      <div className="mt-2 flex items-center justify-between gap-2">
        <span className="font-semibold text-stone-950">
          {product.price}
        </span>

        <span className="flex items-center gap-1 text-xs text-stone-600">
          <span className="text-[#c48421]">★</span>
          {product.rating}
        </span>
      </div>
    </article>
  );
};

export default RelatedProductCard;