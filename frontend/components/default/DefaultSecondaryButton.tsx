// === React Imports ===
import React from 'react';

// === Custom Imports ===
import DefaultText from './DefaultText';
import '../../styles/components/default/DefaultSecondaryButton.css';

type DefaultSecondaryButtonProps = {
  text: string;
  className?: string;
  style?: any;
  onClick: () => void;
  disabled?: boolean;
}

const DefaultSecondaryButton = ({
  text,
  className,
  style,
  onClick,
  disabled,
}: DefaultSecondaryButtonProps): JSX.Element => (
  <button
    type="button"
    className={`defaultSecondaryButton ${className} ${disabled && 'defaultSecondaryInactiveButton'}`}
    style={style}
    onMouseDown={() => {
      if (!disabled) onClick();
    }}
  >
    <DefaultText className="defaultSecondaryButtonText" text={text} />
  </button>
);

export default DefaultSecondaryButton;
