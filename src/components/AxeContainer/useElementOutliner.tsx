import {useEffect, useRef} from 'react';

export function useElementOutliner(element ?: HTMLElement) {
  const outliner = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (element) {
      const div = outliner.current = document.createElement("div");
      div.className = "violationOutliner";
      div.style.position = "absolute";
      div.style.top = element.offsetTop+"px";
      div.style.left = element.offsetLeft+"px";
      div.style.width = element.clientWidth+"px";
      div.style.height= element.clientHeight+"px";
      document.body.appendChild(div);

    } else {
      outliner.current?.remove();
      outliner.current = null;
    }
    return () => {outliner.current?.remove()}
  }, [element]);
}
