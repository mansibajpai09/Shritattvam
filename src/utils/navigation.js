/**
 * Smoothly scrolls to the Collections section, accounting for dynamic navbar height.
 * If the section is not yet present in the DOM (e.g. immediately after navigating from another route),
 * it waits using requestAnimationFrame until the section is mounted.
 */
export function scrollToCollections() {
  const startTime = performance.now();
  const maxTimeoutMs = 2500;

  function attemptScroll() {
    const target = document.getElementById('collections') || document.getElementById('top-picks');
    const header = document.querySelector('header');

    if (target) {
      const headerHeight = header ? header.getBoundingClientRect().height : 0;
      const elementPosition = target.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - headerHeight;

      window.scrollTo({
        top: Math.max(0, offsetPosition),
        behavior: 'smooth',
      });
      return;
    }

    if (performance.now() - startTime < maxTimeoutMs) {
      requestAnimationFrame(attemptScroll);
    }
  }

  // Double rAF ensures any pending route transition DOM commits have settled
  requestAnimationFrame(() => {
    requestAnimationFrame(attemptScroll);
  });
}
