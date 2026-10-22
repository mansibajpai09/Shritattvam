function QuantitySelector({ quantity, onIncrease, onDecrease }) {
  return (
    <div className="inline-flex items-center rounded border border-brown/15 bg-white">
      <button
        type="button"
        onClick={onDecrease}
        disabled={quantity <= 1}
        className="flex h-9 w-9 items-center justify-center text-brown-muted transition-colors duration-200 hover:bg-cream hover:text-brown disabled:cursor-not-allowed disabled:opacity-50"
        aria-label="Decrease quantity"
      >
        <svg
          className="h-3.5 w-3.5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M5 12h14"
          />
        </svg>
      </button>

      <span className="flex h-9 w-10 items-center justify-center border-x border-brown/15 text-sm font-medium text-brown">
        {quantity}
      </span>

      <button
        type="button"
        onClick={onIncrease}
        className="flex h-9 w-9 items-center justify-center text-brown-muted transition-colors duration-200 hover:bg-cream hover:text-brown"
        aria-label="Increase quantity"
      >
        <svg
          className="h-3.5 w-3.5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 5v14M5 12h14"
          />
        </svg>
      </button>
    </div>
  );
}

export default QuantitySelector;