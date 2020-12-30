import * as React from 'react';

export const ChildComponent = React.forwardRef((props, ref) => {
  return <div ref={ref}>{props.children}</div>;
});

ChildComponent.displayName = 'ChildComponent';
