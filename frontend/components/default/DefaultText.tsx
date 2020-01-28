// === React Imports ===
import React from 'react';

// === Custom Imports ===
import '../../styles/components/default/DefaultText.css';

type DefaultTextProps = {
  text: string;
  className?: string;
  style?: any;
}

const DefaultText = ({ text, className, style }: DefaultTextProps): JSX.Element => (
  <p className={`defaultText ${className}`} style={style}>
    {text}
  </p>
);

export default DefaultText;
