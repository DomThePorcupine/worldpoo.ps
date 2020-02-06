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
import StallTalesList from '../components/StallTalesList';
import Loading from '../components/Loading';
import { StallInfo, StallRating, User } from '../utils/Types';
import poopImg from '../assets/crap.png';
import { Routes } from '../utils/Routes';
import '../styles/screens/StallHomeScreen.css';

type StallHomeScreenProps = RouteComponentProps & {
    history: any;
    currentStall: StallInfo | undefined;
    currentUser: User | undefined;
    onRatingChange: (rating: number) => void;
    onTaleVote: (taleIndex: number, vote: boolean) => void;
    getStallInfo: (stallId: number) => void;
    getUsername: () => void;
};

type StallHomeScreenState = {};

class StallHomeScreen extends Component<StallHomeScreenProps, StallHomeScreenState> {

    /**
     * In the case that the user logs in straight with the URL, we want to get the stall and login first.
     */
    componentDidMount() {
        const { currentStall, currentUser, getStallInfo, getUsername } = this.props;
        const stallId = window.location.pathname.split('/').slice(-1)[0];

        if (!currentUser) {
            getUsername();
        } else if (!currentStall) {
            getStallInfo(stallId);
        }
    }

    /**
     * Gets different message based on rating
     * @param rating - rating
     */
    getRatingsMsg(rating: number): string {
        if (rating === 1) {
            return "That's shit!";
        } else if (rating === 2) {
            return "That's terrible!";
        } else if (rating === 3) {
            return "Not too bad.";
        } else if (rating === 4) {
            return "That's good shit!";
        } else if (rating === 5) {
            return "Wow, That's amazing!"
        }

        return 'How is this stall?';
    }

    /**
     * Our implementation of the render function
     *
     * @return {JSX.Element}
     */
    render(): JSX.Element {
        const { currentStall, onRatingChange, onTaleVote } = this.props;

        if (!currentStall) {
            return <Loading text="Loading stall..." />;
        }

        return (
            <div>
                <DefaultTopBar title={currentStall.name} />
                <div className="stallHomeScreenContainer">
                    <img className="stallHomeScreenPoopImg" src={poopImg} />
                    <DefaultHeader
                        className="stallHomeScreenRating"
                        text={currentStall.averageScore.toFixed(1)}
                    />
                    <DefaultText
                        className="stallHomeScreenRatingMsg"
                        text={this.getRatingsMsg(currentStall.myRating)}
                    />
                    <RatingOptions
                        className="stallHomeScreenRatingContainer"
                        value={currentStall.myRating}
                        onValueChange={onRatingChange}
                        ratings={[1, 2, 3, 4, 5]}
                    />
                    <DefaultPrimaryButton
                        className="stallHomeScreenWriteBtn"
                        text={"Write Story"}
                        onClick={() => {
                            this.props.history.push(`${Routes.STALL_WRITE}/${currentStall.id}`)
                        }}
                    />
                    {
                        currentStall.tales.length <= 0 ? (
                            <DefaultText className="stallHomeNoTalesText" text="No tales to display yet!" />
                        ) : (
                            <StallTalesList tales={currentStall.tales} onTaleVote={onTaleVote} />
                        )
                    }
                </div>
            </div>
        );
    }
}

export default withRouter(StallHomeScreen);
