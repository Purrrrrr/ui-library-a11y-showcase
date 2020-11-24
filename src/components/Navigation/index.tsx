import React from 'react';

import './Navigation.scss';

export function Navigation({children} : React.PropsWithChildren<{}>) {
  return <nav id="mainNavigation">{children}</nav>;
}
