import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname, state, hash } = useLocation();

  useEffect(() => {
    // If navigation requested scrolling to a section, do not interfere with the section scroller
    if (state?.scrollToSection || hash === "#collections" || hash === "#top-picks") {
      return;
    }

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });
  }, [pathname, state, hash]);

  return null;
};

export default ScrollToTop;