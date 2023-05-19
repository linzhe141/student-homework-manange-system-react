import React from 'react';
type Props = {
  children: JSX.Element;
};
export const Content: React.FC<Props> = (props) => {
  const { children } = props;
  return <div className="m-4 rounded p-2">{children}</div>;
};
