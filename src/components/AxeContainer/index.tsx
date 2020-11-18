import React, {useRef, useState} from 'react';
import {LibraryContainer} from '../LibraryContainer';
import {useAxe, AxeResults, Result, ImpactValue, NodeResult} from './useAxe';
import {useElementOutliner} from './useElementOutliner';

import './AxeContainer.scss'

interface AxeContainerProps extends React.ComponentProps<typeof LibraryContainer> {}

export function AxeContainer({library, children} : AxeContainerProps) {
  const container = useRef<HTMLDivElement | null>(null);
  const results = useAxe(container, children);

  return <section className="axeContainer">
    <LibraryContainer library={library} ref={container}>
      {children}
    </LibraryContainer>
    <ResultsView results={results} />
  </section>
}

function ResultsView({results} : {results?: AxeResults}) {
  if (!results) return <div>Waiting for analysis results</div>
  if (!results.violations.length) return <div>No accessibility violations</div>

  return <div className="axeResults">
    {results.violations.length} accessibility violations
    {results.violations.map(violation => <AxeViolation key={violation.id} violation={violation} />)}
  </div>
}

function AxeViolation({violation} : {violation: Result}) {
  const {nodes, id, impact, help, helpUrl} = violation;
  return <section className="axeViolation">
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
  return <span className="impact">
    Impact: {impact}
  </span>
}

function ViolatingNode({node} : {node: NodeResult}) {
  const {element, target, html, failureSummary} = node;
  const [isOutlining, setIsOutlining] = useState(false);
  const updateOutline = useElementOutliner(isOutlining ? element : undefined);
  //const messages = [...any, ...all, ...none].map(r => r.message);
  return <div className="violatingNodeReport"
    onClick={() => {element?.scrollIntoView(); setTimeout(updateOutline, 30)}}
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
