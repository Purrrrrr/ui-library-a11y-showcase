import {useState} from 'react';
import {useDelayedEffect} from './useDelayedEffect';
import axe, {AxeResults} from 'axe-core';

export type {AxeResults, Result, ImpactValue, NodeResult} from 'axe-core';

type ResultsCallback = (res : AxeResults) => any;

let axeRunning = false;
const axeQueue = new Map<HTMLElement, ResultsCallback>();

export function useAxe(containerRef : React.RefObject<HTMLElement>, children: React.ReactNode) : AxeResults | undefined {
  const [results, setResults] = useState<AxeResults | undefined>();
  useDelayedEffect(100, () => {
    const elem = containerRef.current;
    if (elem == null) return;
    if (axeRunning) {
      axeQueue.set(elem, setResults);
      return () => {axeQueue.delete(elem)};
    } else {
      runAnalysisOn(elem, setResults);
      return () => {};
    }
  });

  return results;
}

async function runAnalysisOn(elem : HTMLElement, callBack : (res : AxeResults) => any ) {
  axeRunning = true;
  console.log("Running axe");
  const results = await axe.run(elem, {elementRef: true});
  callBack(results);
  if (axeQueue.size) {
    for (const [newElem, newCallback] of axeQueue) {
      axeQueue.delete(newElem);
      runAnalysisOn(newElem, newCallback);
      return;
    }
  } else {
    axeRunning = false;
  }
}
