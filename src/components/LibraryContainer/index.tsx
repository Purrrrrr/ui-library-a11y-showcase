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
  return React.forwardRef<HTMLDivElement, React.PropsWithChildren<{}>>(
    (props: React.PropsWithChildren<{}>, ref) =>
      <LibraryContainer library={library} {...props} ref={ref}/>
      );
}
