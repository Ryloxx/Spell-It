import React from 'react';
import { CSSTransition, Transition } from 'react-transition-group';

export default ({ inc, in: inProp, ...props }) => {
  const nodeRef = React.createRef();
  return (
    <Transition nodeRef={nodeRef} in={inc} classNames="game" timeout={300}>
      {(state) => (
        <div
          {...props}
          style={{
            opacity: `${inProp ? 1 : 0}`,
            transition: `all 100ms ease-out`,
            ...{
              entering: { opacity: 0 },
              entered: { opacity: 1 },
              exiting: { opacity: 0, display: 'none' },
              exited: { opacity: 0, display: 'none' },
            }[state],
          }}
          ref={nodeRef}
        />
      )}
    </Transition>
  );
};
