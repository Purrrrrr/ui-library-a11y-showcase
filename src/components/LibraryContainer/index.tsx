import React from 'react';
import './LibraryContainer.scss';

export type UILibrary = 'materialDesign' | 'blueprint' | 'bootstrap';

type LibraryContainerProps = React.PropsWithChildren<{
  library: UILibrary
  inline?: boolean
  className?: string
}>

export const LibraryContainer = React.forwardRef<HTMLDivElement, LibraryContainerProps>((
  {library, children, className, inline = false} : LibraryContainerProps, ref
) => {
  return <div className={library+(inline ? ' inline' : '')+(className ? ' '+className : '')} ref={ref}>
    {children}
  </div>;
});

export function libraryContainerFor(library: UILibrary) {
  return React.forwardRef<HTMLDivElement, React.PropsWithChildren<{}>>(
    (props: React.PropsWithChildren<{}>, ref) =>
      <LibraryContainer library={library} {...props} ref={ref}/>
      );
}
