// -- Third party imports -- //
import React, { Component } from 'react';
import { RouteComponentProps } from 'react-router';
import { withRouter } from 'react-router-dom';

// -- Our imports -- //
import DefaultHeader from '../components/default/DefaultHeader';
import DefaultText from '../components/default/DefaultText';
import DefaultPrimaryButton from '../components/default/DefaultPrimaryButton';
import DefaultTopBar from '../components/default/DefaultTopBar';
import RatingOptions from '../components/RatingOptions';
import StallStoriesList from '../components/StallStoriesList';
import { StallInfo, StallRating, User } from '../utils/Types';
import poopImg from '../assets/crap.png';
import { Routes } from '../utils/Routes';
import '../styles/screens/StallHomeScreen.css';

type StallHomeScreenProps = RouteComponentProps & {
    history: any;
    currentStall: StallInfo | undefined;
    currentUser: User | undefined;
};

type StallHomeScreenState = {
    selectedRating: string;
};

/**
 * The StallInfoScreen is loaded when a user scans a QR code!
 */
class StallHomeScreen extends Component<StallHomeScreenProps, StallHomeScreenState> {
    constructor(props: StallHomeScreenProps) {
        super(props);
        this.state = {
            selectedRating: '',
        }

        this.getAvgRating = this.getAvgRating.bind(this);
        this.getRatingsMsg = this.getRatingsMsg.bind(this);
        this.onRatingChange = this.onRatingChange.bind(this);
    }

    componentDidMount() {
        const stallId = window.location.pathname.split('/').slice(-1)[0];

        // Check if user is logged in
        if (!this.props.currentUser) {
            this.props.history.replace(`${Routes.REGISTER}/${stallId}`);
        }
    }

    getAvgRating(ratings: Array<StallRating>): string {
        const totalRatings = ratings.reduce((a: number, b: StallRating) => a + b.score, 0);
        return `${(totalRatings / ratings.length).toFixed(1)}`;
    }

    getRatingsMsg(value: string): string {
        if (value === '1') {
            return "That's shit!";
        } else if (value === '2') {
            return "That's terrible!";
        } else if (value === '3') {
            return "Not too bad.";
        } else if (value === '4') {
            return "That's good shit!";
        } else if (value === '5') {
            return "Wow, That's amazing!"
        }

        return 'How is this stall?';
    }

    onRatingChange(newValue: string) {
        this.setState({ 
            selectedRating: newValue,
        })
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

        const { currentStall } = this.props;
        const { selectedRating } = this.state;
        return (
            <div>
                <DefaultTopBar title={currentStall.name} />
                <div className="stallHomeScreenContainer">
                    <img className="stallHomeScreenPoopImg" src={poopImg} />
                    <DefaultHeader 
                        className="stallHomeScreenRating" 
                        text={this.getAvgRating(selectedRating 
                            ? [...currentStall.ratings, { score: parseInt(selectedRating) }]
                            : currentStall.ratings)
                        }
                    />
                    <DefaultText
                        className="stallHomeScreenRatingMsg"
                        text={this.getRatingsMsg(selectedRating)} 
                    />
                    <RatingOptions 
                        className="stallHomeScreenRatingContainer"
                        value={selectedRating}
                        onValueChange={this.onRatingChange} 
                        ratings={['1','2','3','4','5']}
                    />
                    <DefaultPrimaryButton
                        className="stallHomeScreenWriteBtn"
                        text={"Write Story"}
                        onClick={() => { 
                            const stallId = window.location.pathname.split('/').slice(-1)[0];
                            this.props.history.push(`${Routes.STALL_WRITE}/${stallId}`)
                        }} 
                    />
                    <StallStoriesList stories={currentStall.tales} />
                </div>
            </div>
        );
    }
}

export default withRouter(StallHomeScreen);
