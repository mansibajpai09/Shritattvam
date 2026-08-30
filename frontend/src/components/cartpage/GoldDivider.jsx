function GoldDivider() {
  return (
    <div className="flex items-center gap-3" aria-hidden="true">
      <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gold/50 to-gold/30" />
      <svg className="h-2.5 w-2.5 text-gold" viewBox="0 0 12 12" fill="currentColor">
        <path d="M6 0L7.5 4.5L12 6L7.5 7.5L6 12L4.5 7.5L0 6L4.5 4.5Z" />
      </svg>
      <div className="h-px flex-1 bg-gradient-to-l from-transparent via-gold/50 to-gold/30" />
    </div>
  )
}
export default GoldDivider