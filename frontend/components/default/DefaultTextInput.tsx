// === React Imports ===
import React from 'react';

// === Custom Imports ===
import '../../styles/components/default/DefaultTextInput.css';

type DefaultTextInputProps = {
  placeholder?: string;
  className?: string;
  style?: any;
  type?: any;
  spellCheck?: boolean;
  value: string;
  onValueChange?: (value: any) => void;
}

const DefaultTextInput = ({
  placeholder,
  className,
  style,
  type,
  spellCheck,
  value,
  onValueChange,
}: DefaultTextInputProps): JSX.Element => (
  <input
    className={`defaultTextInput ${className}`}
    style={style}
    value={value}
    type={type || 'text'}
    placeholder={placeholder}
    spellCheck={spellCheck}
    onChange={onValueChange || undefined}
  />
);

export default DefaultTextInput;
