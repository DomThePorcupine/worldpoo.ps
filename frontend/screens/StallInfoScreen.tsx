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
import '../styles/screens/StallInfoScreen.css';

type StallInfoScreenProps = RouteComponentProps & {
    history: any;
    currentStall: StallInfo | undefined;
    getStallInfo: (stallId: string) => void;
};

type StallInfoScreenState = {};

/**
 * The StallInfoScreen is loaded when a user scans a QR code!
 */
class StallInfoScreen extends Component<StallInfoScreenProps, StallInfoScreenState> {
    componentDidMount() {
        // Get stall info from backend using API
        if (!this.props.currentStall) {
            const stallId = window.location.pathname.split('/').slice(-1)[0];
            this.props.getStallInfo(stallId);
        }
    }

    /**
     * Our implementation of the render function
     *
     * @return {JSX.Element}
     */
    render (): JSX.Element {
        if (!this.props.currentStall) {
            // TODO: Make Loading UI
            return <p>Loading...</p>;
        }

        return (
            <div className="stallInfoContainer">
                <div className="stallInfoContent">
                    <div className="stallInfoHeaderContainer">
                        <DefaultHeader className="stallInfoScreenHeader" text={"Welcome to "} />
                        <DefaultHeader className="stallInfoScreenStallName" text={`${this.props.currentStall.name}!`} />
                    </div>
                    <img className="stallInfoToilet" src={toiletImg} />
                    <DefaultText className="stallInfoReadText" text="Read about stories that happened in the same exact stall you are in!" />
                    <DefaultText className="stallInfoShareText" text="Share your experience with those who will use this stall in the future!" />
                </div>
                <DefaultPrimaryButton 
                    className="stallInfoActionBtn"
                    text="Read Stories" 
                    onClick={() => { this.props.history.push('/stall/test_stall') }} 
                />
            </div>
        );
    }
}

export default withRouter(StallInfoScreen);
