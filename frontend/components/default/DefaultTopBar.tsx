// === React Imports ===
import React, { Fragment } from 'react';

// === Custom Imports ===
import DefaultSecondaryButton from './DefaultSecondaryButton';
import DefaultText from './DefaultText';
import { TopNavButton } from '../../utils/Types';
import '../../styles/components/default/DefaultTopBar.css';

type DefaultTopBarProps = {
  leftButton?: TopNavButton;
  title?: string;
  rightButton?: TopNavButton;
  hideDivider?: boolean;
  leftButtonDisabled?: boolean;
  rightButtonDisabled?: boolean;
}

const DefaultTopBar = ({
  leftButton,
  title,
  rightButton,
  hideDivider,
  leftButtonDisabled,
  rightButtonDisabled,
}: DefaultTopBarProps): JSX.Element => (
  <div className={`defaultTopBarContainer ${!hideDivider && 'defaultTopBarBorder'}`}>
    {
      !leftButton && !rightButton ? (
        <DefaultText className="defaultTopBarTitle defaultTopBarSingleTitle" text={title || ''} />
      ) : (
        <Fragment>
          <DefaultSecondaryButton
            text={leftButton ? leftButton.text : ''}
            onClick={() => leftButton && leftButton.onClick()}
            className="defaultTopBarLeftButton"
            disabled={leftButtonDisabled}
          />
          <DefaultText className="defaultTopBarTitle" text={title || ''} />
          <DefaultSecondaryButton
            text={rightButton ? rightButton.text : ''}
            onClick={() => rightButton && rightButton.onClick()}
            className="defaultTopBarRightButton"
            disabled={rightButtonDisabled}
          />
        </Fragment>
      )
    }
  </div>
);

export default DefaultTopBar;
