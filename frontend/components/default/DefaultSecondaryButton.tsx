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
}

const DefaultSecondaryButton = ({
  text,
  className,
  style,
  onClick,
}: DefaultSecondaryButtonProps): JSX.Element => (
  <button
    type="button"
    className={`defaultSecondaryButton ${className}`}
    style={style}
    onMouseDown={() => { onClick(); }}
  >
    <DefaultText className="defaultSecondaryButtonText" text={text} />
  </button>
);

export default DefaultSecondaryButton;
