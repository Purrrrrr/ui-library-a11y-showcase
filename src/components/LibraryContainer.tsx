import React from 'react';
import './LibraryContainer.scss';

type UILibrary = 'materialDesign' | 'blueprint' | 'bootstrap';

type LibraryContainerProps = React.PropsWithChildren<{
  library: UILibrary
  inline?: boolean
}>

export const LibraryContainer = React.forwardRef<HTMLDivElement, LibraryContainerProps>((
  {library, children, inline = false} : LibraryContainerProps, ref
) => {
  return <div className={library+(inline ? ' inline' : '')} ref={ref}>
    {children}
  </div>;
});
