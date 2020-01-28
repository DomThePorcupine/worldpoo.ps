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
  <div className={`defaultTextInput ${className}`} style={style}>
    <input
      value={value}
      type={type || 'text'}
      placeholder={placeholder}
      spellcheck={spellCheck}
      onChange={onValueChange || undefined}
    />
  </div>
);

export default DefaultTextInput;
