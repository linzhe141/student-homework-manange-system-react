import React from 'react';
type Props = {
  children: JSX.Element;
};
export const Content: React.FC<Props> = (props) => {
  const { children } = props;
  return <div className="m-2 rounded">{children}</div>;
};
