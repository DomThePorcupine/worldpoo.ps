// === React Imports ===
import React from 'react';

// === Custom Imports ===
import DefaultText from './DefaultText';
import '../../styles/components/default/DefaultPrimaryButton.css';

type DefaultPrimaryButtonProps = {
  text: string;
  className?: string;
  style?: any;
  onClick: () => void;
  disabled?: boolean;
}

const DefaultPrimaryButton = ({
  text,
  className,
  style,
  onClick,
  disabled
}: DefaultPrimaryButtonProps): JSX.Element => (
  <button
    type="button"
    className={`defaultPrimaryButton ${className} ${disabled && 'defaultPrimaryInactiveButton'}`}
    style={style}
    onMouseDown={() => {
      if (!disabled) onClick();
    }}
  >
    <DefaultText className="defaultPrimaryButtonText" text={text} />
  </button>
);

export default DefaultPrimaryButton;
