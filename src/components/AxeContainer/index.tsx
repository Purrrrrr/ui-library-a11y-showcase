import React, {useRef, useState} from 'react';
import {LibraryContainer} from '../LibraryContainer';
import {useAxe, AxeResults, Result, ImpactValue, NodeResult} from './useAxe';
import {useElementOutliner} from './useElementOutliner';

import './AxeContainer.scss'

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
  if (!results.violations.length) return <div>No accessibility violations</div>
  
  return <div>
    {results.violations.length} accessibility violations
    {results.violations.map(violation => <AxeViolation key={violation.id} violation={violation} />)}
  </div>
}

function AxeViolation({violation} : {violation: Result}) {
  const {nodes, id, impact, help, helpUrl} = violation;
  return <section style={{margin: "2px 0", border: "1px solid black", padding: 5}}>
    <h2>
      {id}
      <Impact impact={impact} />
    </h2>
    {help}. <a href={helpUrl}>More info</a>
    <h3>Nodes</h3>
    {nodes.map((node,i) => <ViolatingNode key={i} node={node} />)}
  </section>
}

function Impact({impact} : {impact?: ImpactValue}) {
  return <span style={{background: '#555', color: 'white', borderRadius: 5, padding: 3, margin: "0 8px", fontSize: 14}}>
    Impact: {impact}
  </span>
}

function ViolatingNode({node} : {node: NodeResult}) {
  const {element, target, html, failureSummary} = node;
  const [isOutlining, setIsOutlining] = useState(false);
  useElementOutliner(isOutlining ? element : undefined);
  //const messages = [...any, ...all, ...none].map(r => r.message);
  return <div className="violatingNodeReport" 
    tabIndex={0}
    onMouseEnter={() => setIsOutlining(true)}
    onMouseLeave={(e) => setIsOutlining(false)}
    onFocus={() => setIsOutlining(true)}
    onBlur={() => setIsOutlining(false)}
  >
    <h4>CSS Path: {target.join(" - ")}</h4>
    <p>Offending HTML: {html}</p>
    {failureSummary} 
  </div>
}
