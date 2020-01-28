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
}

const DefaultPrimaryButton = ({
  text,
  className,
  style,
  onClick,
}: DefaultPrimaryButtonProps): JSX.Element => (
  <button
    type="button"
    className={`defaultPrimaryButton ${className}`}
    style={style}
    onMouseDown={() => { onClick(); }}
  >
    <DefaultText className="defaultPrimaryButtonText" text={text} />
  </button>
);

export default DefaultPrimaryButton;
