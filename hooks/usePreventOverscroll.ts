// hooks/usePreventOverscroll.ts
import { useEffect } from 'react';

export function usePreventOverscroll() {
  useEffect(() => {
    const overflow = 100;
    document.body.style.overflowY = "hidden";
    document.body.style.marginTop = `${overflow}px`;
    document.body.style.height = window.innerHeight + overflow + "px";
    document.body.style.paddingBottom = `${overflow}px`;
    window.scrollTo(0, overflow);

    let ts: number | undefined; // touch start position
    const scrollableEl = document.querySelector(".messages");

    const onTouchStart = (e: TouchEvent) => {
      ts = e.touches[0] ? e.touches[0].clientY : undefined;
    };

    const onTouchMove = (e: TouchEvent) => {
      if (scrollableEl) {
        const scroll = scrollableEl.scrollTop;
        const te = e.changedTouches[0] ? e.changedTouches[0].clientY : undefined;

        if (te !== undefined && ts !== undefined && scroll <= 0 && ts < te) {
          e.preventDefault();
        }
      } else {
        console.log("scroll prevented");
      }
    };

    document.documentElement.addEventListener("touchstart", onTouchStart, {
      passive: false,
    });
    document.documentElement.addEventListener("touchmove", onTouchMove, {
      passive: false,
    });

    return () => {
      document.documentElement.removeEventListener("touchstart", onTouchStart);
      document.documentElement.removeEventListener("touchmove", onTouchMove);
    };
  }, []);
}
