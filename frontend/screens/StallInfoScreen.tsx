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
    setCurrentStall: (stallInfo: StallInfo) => void;
};

type StallInfoScreenState = {};

/**
 * The StallInfoScreen is loaded when a user scans a QR code!
 */
class StallInfoScreen extends Component<StallInfoScreenProps, StallInfoScreenState> {
    componentDidMount() {
        // Get stall info from backend using API
        if (!this.props.currentStall) {
            this.getStallInfo('test_stall');
        }
    }

    /**
     * Gets stall info
     * @param stallId - stall id to send to API
     * @return {StallInfo} - stall info
     */
    getStallInfo(stallId: string) {
        let result: StallInfo = {
            address: '1601 Marys Ave. Suite 3G',
            name: 'Deeplocal Stall #15',
            tales: [
                { taleText: 'Damn, that was a rough one.', username: 'Adnan' }, 
                { taleText: '', username: 'Dom' }, 
                { taleText: '', username: 'Taylor' }, 
                { taleText: '', username: 'Andres' }, 
            ],
            ratings: [
                { score: 3 },
                { score: 5 },
                { score: 4 },
            ],
        }
        
        this.props.setCurrentStall(result);
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
            <div className="stall-info-container">
                <div className="stall-info-content">
                    <div className="stall-info-header-container">
                        <DefaultHeader className="stall-info-screen-header" text={"Welcome to "} />
                        <DefaultHeader className="stall-info-screen-stall-name" text={`${this.props.currentStall.name}!`} />
                    </div>
                    <img className="stall-info-toilet" src={toiletImg} />
                    <DefaultText className="stall-info-read-text" text="Read about stories that happened in the same exact stall you are in!" />
                    <DefaultText className="stall-info-share-text" text="Share your experience with those who will use this stall in the future!" />
                </div>
                <DefaultPrimaryButton 
                    className="stall-info-action-btn"
                    text="Read Stories" 
                    onClick={() => { this.props.history.push('/stall/test_stall') }} 
                />
            </div>
        );
    }
}

export default withRouter(StallInfoScreen);
