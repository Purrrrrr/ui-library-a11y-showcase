import React, {useRef, useState} from 'react';
import {useAxe, AxeResults, Result, ImpactValue, NodeResult} from './useAxe';
import {useElementOutliner} from './useElementOutliner';

import './AxeContainer.scss'

type AxeContainerProps = React.PropsWithChildren<{
  wrapperComponent?: React.ComponentType<React.PropsWithChildren<{}>>
}>

export function AxeContainer({wrapperComponent, children} : AxeContainerProps) {
  const container = useRef<HTMLDivElement | null>(null);
  const results = useAxe(container, children);
  const Wrapper = wrapperComponent ?? "div"

  return <section className="axeContainer">
    <Wrapper ref={container} className="inspectedElement">
      {children}
    </Wrapper>
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
    <p>{help}. <a href={helpUrl}>More info</a></p>
    <h3>Nodes</h3>
    <div className="violatingNodes">
      {nodes.map((node,i) => <ViolatingNode key={i} node={node} />)}
    </div>
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
    <h4>CSS Path: <pre>{target.join(" - ")}</pre></h4>
    <p>Offending HTML: <pre>{html}</pre></p>
    <p className="summary">{failureSummary}</p>
  </div>
}
