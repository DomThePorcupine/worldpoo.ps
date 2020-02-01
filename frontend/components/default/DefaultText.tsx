// === React Imports ===
import React from 'react';

// === Custom Imports ===
import '../../styles/components/default/DefaultText.css';

type DefaultTextProps = {
  text: string;
  className?: string;
  style?: any;
  onClick?: () => void;
}

const DefaultText = ({ text, className, style, onClick }: DefaultTextProps): JSX.Element => (
  <p className={`defaultText ${className}`} style={style} onClick={() => { onClick && onClick(); }}>
    {text}
  </p>
);

export default DefaultText;
