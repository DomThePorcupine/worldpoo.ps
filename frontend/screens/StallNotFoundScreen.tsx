// -- Third party imports -- //
import React, { Component } from 'react';
import { RouteComponentProps } from 'react-router';
import { withRouter } from 'react-router-dom';

// -- Our imports -- //
import DefaultText from '../components/default/DefaultHeader';
import DefaultPrimaryButton from '../components/default/DefaultPrimaryButton';
import { Routes } from '../utils/Routes';
import toiletImg from '../assets/toilet.png';
import '../styles/screens/StallNotFoundScreen.css';

type StallNotFoundScreenProps = RouteComponentProps & {
    history: any;
}
type StallNotFoundScreenState = {};

class StallNotFoundScreen extends Component<StallNotFoundScreenProps, StallNotFoundScreenState> {
    /**
     * Our implementation of the render function
     *
     * @return {JSX.Element}
     */
    render (): JSX.Element {
        return (
            <div className="notFoundContainer">
                <img className="notFoundToilet" src={toiletImg} />
                <DefaultText className="notFoundText" text={'Oops, stall was not found.'} />
                <DefaultPrimaryButton className="notFoundHomeBtn" text="Go to home" onClick={() => { this.props.history.push(Routes.HOME) }} />
            </div>
        );
    }
}

export default withRouter(StallNotFoundScreen);
