import invariant from 'invariant';
import * as React from 'react';
import {ChildComponent} from '../SortableContainer/childContainer';
import {provideDisplayName} from '../utils';

export default function sortableHandle(
  WrappedComponent,
  config = {withRef: false},
) {
  return class WithSortableHandle extends React.Component {
    static displayName = provideDisplayName('sortableHandle', WrappedComponent);

    childRef = React.createRef(null);

    componentDidMount() {
      const node = this.childRef.current;
      node.sortableHandle = true;
    }

    getWrappedInstance() {
      invariant(
        config.withRef,
        'To access the wrapped instance, you need to pass in {withRef: true} as the second argument of the SortableHandle() call',
      );
      return this.wrappedInstance.current;
    }

    wrappedInstance = React.createRef();

    render() {
      const ref = config.withRef ? this.wrappedInstance : null;

      return (
        <ChildComponent ref={this.childRef}>
          <WrappedComponent ref={ref} {...this.props} />
        </ChildComponent>
      );
    }
  };
}

export function isSortableHandle(node) {
  return node.sortableHandle != null;
}
