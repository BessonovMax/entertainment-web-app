import { useRef, useEffect } from "react";

export function useWheelScroll<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleWheel = (e: WheelEvent) => {
      // If the user isn't scrolling vertically, we don't need to do anything.
      if (e.deltaY === 0) return;

      // This is the crucial part: it prevents the default vertical page scroll.
      e.preventDefault();

      // We add the vertical scroll amount (e.deltaY) to the element's
      // horizontal scroll position (element.scrollLeft).
      element.scrollLeft += e.deltaY;
    };

    // We must add the event listener with '{ passive: false }' to be able
    // to call 'e.preventDefault()'. Modern browsers default to passive
    // listeners for wheel events for performance reasons.
    element.addEventListener("wheel", handleWheel, { passive: false });

    // The cleanup function removes the event listener when the component unmounts.
    return () => {
      element.removeEventListener("wheel", handleWheel);
    };
  }, []); // The empty array ensures this effect runs only once.

  return ref;
}
