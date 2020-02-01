// === React Imports ===
import React from 'react';

// === Custom Imports ===
import DefaultHeader from './default/DefaultHeader';
import '../styles/components/Loading.css';

type LoadingProps = {
    text: string;
}

const Loading = ({ text }: LoadingProps): JSX.Element => (
  <div className="loadingContainer">
      <div className="lds-ripple"><div></div><div></div></div>
      <DefaultHeader className="loadingText" text={text} />
  </div>
);

export default Loading;
