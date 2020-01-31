// -- Third party imports -- //
import React, { Component } from 'react';
import { RouteComponentProps } from 'react-router';
import { withRouter } from 'react-router-dom';

// -- Our imports -- //
import DefaultHeader from '../components/default/DefaultHeader';
import DefaultText from '../components/default/DefaultText';
import DefaultPrimaryButton from '../components/default/DefaultPrimaryButton';
import { StallInfo } from '../utils/Types';
import toiletImg from '../assets/toilet.png';
import { Routes } from '../utils/Routes';
import '../styles/screens/StallInfoScreen.css';

type StallInfoScreenProps = RouteComponentProps & {
    history: any;
    currentStall: StallInfo | undefined;
};

/**
 * The StallInfoScreen is loaded when a user scans a QR code!
 */
const StallInfoScreen = ({ history, currentStall }: StallInfoScreenProps): JSX.Element => (
    <div className="stallInfoContainer">
        <div className="stallInfoContent">
            <div className="stallInfoHeaderContainer">
                <DefaultHeader className="stallInfoScreenHeader" text={"Welcome to "} />
                <DefaultHeader className="stallInfoScreenStallName" text={`${currentStall.name}!`} />
            </div>
            <img className="stallInfoToilet" src={toiletImg} />
            <DefaultText className="stallInfoReadText" text="Read about stories that happened in the same exact stall you are in!" />
            <DefaultText className="stallInfoShareText" text="Share your experience with those who will use this stall in the future!" />
            <DefaultPrimaryButton 
                className="stallInfoActionBtn"
                text="Read Stories" 
                onClick={() => {
                    const stallId = window.location.pathname.split('/').slice(-1)[0];
                    history.push(`${Routes.STALL_HOME}/${stallId}`)
                }} 
            />
        </div>
    </div>
);

export default withRouter(StallInfoScreen);
