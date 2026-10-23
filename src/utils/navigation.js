/**
 * Smoothly scrolls the window to the Collections (Top Picks) section,
 * dynamically calculating the actual height of the sticky navbar.
 */
export function scrollToCollections() {
  const performScroll = () => {
    const target =
      document.getElementById('collections') ||
      document.getElementById('top-picks')

    if (!target) return false

    // Ensure the element is mounted with non-zero dimensions
    const rect = target.getBoundingClientRect()
    if (rect.height === 0 && rect.width === 0) return false

    // Measure the actual sticky header height dynamically (including announcement banner if present)
    const header = document.querySelector('header')
    const headerHeight = header ? header.getBoundingClientRect().height : 0

    // Calculate exact scroll position so the Collections heading & section
    // are fully visible below the sticky navbar
    const targetTop = rect.top + window.scrollY
    const offsetPosition = Math.max(0, Math.round(targetTop - headerHeight))

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth',
    })

    return true
  }

  // Use requestAnimationFrame to let layout flush before measuring
  requestAnimationFrame(() => {
    if (performScroll()) return

    // If target section is not in the DOM yet (e.g. after navigating to Home),
    // wait until the target section is available before scrolling
    let attempts = 0
    const maxAttempts = 60 // 60 * 50ms = 3000ms max timeout
    const interval = setInterval(() => {
      attempts++
      if (performScroll() || attempts >= maxAttempts) {
        clearInterval(interval)
      }
    }, 50)
  })
}
