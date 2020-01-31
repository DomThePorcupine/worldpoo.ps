// === React Imports ===
import React from 'react';

// === Custom Imports ===
import '../../styles/components/default/DefaultTextArea.css';

type DefaultTextAreaProps = {
  placeholder?: string;
  className?: string;
  style?: any;
  spellCheck?: boolean;
  value: string;
  rows?: number;
  onValueChange: (value: any) => void;
}

const DefaultTextArea = ({
  placeholder,
  className,
  style,
  spellCheck,
  value,
  rows,
  onValueChange,
}: DefaultTextAreaProps): JSX.Element => (
  <textarea
    className={`defaultTextArea ${className}`} 
    style={style}
    rows={rows || 10}
    value={value}
    placeholder={placeholder}
    spellCheck={spellCheck}
    onChange={(e: any) => { onValueChange(e); }}
  />
);

export default DefaultTextArea;
