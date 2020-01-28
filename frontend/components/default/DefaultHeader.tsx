// === React Imports ===
import React from 'react';

// === Custom Imports ===
import '../../styles/components/default/DefaultHeader.css';

type DefaultHeaderProps = {
  text: string;
  className?: string;
  style?: any;
}

const DefaultHeader = ({ text, className, style }: DefaultHeaderProps): JSX.Element => (
  <p className={`defaultHeader ${className}`} style={style}>
    {text}
  </p>
);

export default DefaultHeader;
