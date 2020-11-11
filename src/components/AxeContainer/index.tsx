import React, {useRef} from 'react';
import {LibraryContainer} from '../LibraryContainer';
import {useAxe, AxeResults} from './useAxe';

interface AxeContainerProps extends React.ComponentProps<typeof LibraryContainer> {}

export function AxeContainer({library, children} : AxeContainerProps) {
  const container = useRef<HTMLDivElement | null>(null);
  const results = useAxe(container, children);

  return <section>
    <LibraryContainer library={library} ref={container}>
      {children}
    </LibraryContainer>
    <ResultsView results={results} />
  </section>
}

function ResultsView({results} : {results?: AxeResults}) {
  if (!results) return <div>Waiting for analysis results</div>
  
  return <div>
    {results.violations.length} accessibility violations
    {results.violations.length ? <pre>{JSON.stringify(results.violations)}</pre> : null}
  </div>
}
