
const QuantitySelector = ({ quantity, setQuantity }) => {
  const decrease = () => {
    setQuantity((current) => Math.max(1, current - 1));
  };

  const increase = () => {
    setQuantity((current) => current + 1);
  };

  return (
    <div className="flex h-11 w-[125px] items-center justify-between rounded-lg border border-stone-200 bg-white">
      <button
        type="button"
        onClick={decrease}
        className="flex h-full w-10 items-center justify-center text-lg text-stone-600 transition hover:text-[#9b681f]"
      >
        −
      </button>

      <span className="text-sm font-medium text-stone-800">{quantity}</span>

      <button
        type="button"
        onClick={increase}
        className="flex h-full w-10 items-center justify-center text-lg text-stone-600 transition hover:text-[#9b681f]"
      >
        +
      </button>
    </div>
  );
};

export default QuantitySelector;