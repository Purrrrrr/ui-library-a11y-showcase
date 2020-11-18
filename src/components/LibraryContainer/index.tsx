import React from 'react';
import './LibraryContainer.scss';

export type UILibrary = 'materialDesign' | 'blueprint' | 'bootstrap';

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

export function libraryContainerFor(library: UILibrary) {
  return (props: Omit<LibraryContainerProps, "library">) => <LibraryContainer library={library} {...props} />;
}
