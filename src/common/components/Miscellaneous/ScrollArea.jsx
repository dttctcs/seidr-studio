import React from 'react';
import 'overlayscrollbars/css/OverlayScrollbars.css';

import { forwardRef } from 'react';

import { OverlayScrollbarsComponent } from 'overlayscrollbars-react';

export const ScrollArea = forwardRef(({ children, options, ...others }) => {
  // const { classes, cx } = useStyles(
  //   { scrollbarSize, offsetScrollbars, scrollbarHovered },
  //   { name: 'ScrollArea', classNames, styles },
  // );

  return (
    <OverlayScrollbarsComponent options={{ sizeAutoCapable: false, ...options }} {...others}>
      {children}
    </OverlayScrollbarsComponent>
  );
});
