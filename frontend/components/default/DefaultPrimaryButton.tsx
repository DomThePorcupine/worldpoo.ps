// === React Imports ===
import React from 'react';

// === Custom Imports ===
import DefaultText from './DefaultText';
import '../../styles/components/default/DefaultPrimaryButton.css';

type DefaultPrimaryButtonProps = {
  text?: string;
  className?: string;
  style?: any;
  onClick: () => void;
  disabled?: boolean;
  img?: any;
}

const DefaultPrimaryButton = ({
  text,
  className,
  style,
  onClick,
  disabled,
  img
}: DefaultPrimaryButtonProps): JSX.Element => (
  <button
    type="button"
    className={`defaultPrimaryButton ${className} ${disabled && 'defaultPrimaryInactiveButton'}`}
    style={style}
    onMouseDown={() => {
      if (!disabled) onClick();
    }}
  >
    {
      text ? (
        <DefaultText className="defaultPrimaryButtonText" text={text} />
      ) : (
        <img className="defaultPrimaryButtonImg" src={img} />
      )
    }
  </button>
);

export default DefaultPrimaryButton;
