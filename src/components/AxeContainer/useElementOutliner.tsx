import {useEffect, useRef, useState} from 'react';

/* Adds an outliner effect on the given element.
 * Returns an updater function for positioning the outline properly after scrolling etc.*/
export function useElementOutliner(element ?: HTMLElement) {
  const [nr, setNr] = useState(0);
  const outliner = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (element) {
      const div = outliner.current = document.createElement("div");
      div.className = "violationOutliner";
      div.style.position = "absolute";
      const bounds = element.getBoundingClientRect();
      div.style.top = bounds.top+document.documentElement.scrollTop+"px";
      div.style.left = bounds.left+document.documentElement.scrollLeft+"px";
      div.style.width = element.clientWidth+"px";
      div.style.height= element.clientHeight+"px";
      document.body.appendChild(div);
    } else {
      outliner.current?.remove();
      outliner.current = null;
    }
    return () => {outliner.current?.remove()}
  }, [element, nr]);

  return () => setNr(nr+1);
}
