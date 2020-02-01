// -- Third party imports -- //
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom";

// -- Our imports -- //
import StallNotFoundScreen from '../screens/StallNotFoundScreen';
import HomeScreen from '../screens/HomeScreen';
import RegisterScreen from '../screens/RegisterScreen';
import StallInfoScreen from '../screens/StallInfoScreen';
import StallHomeScreen from '../screens/StallHomeScreen';
import TaleWriteScreen from '../screens/TaleWriteScreen';

import Api from '../utils/modules/Api';
import { Routes } from '../utils/Routes';
import { StallInfo, User, StallTale } from '../utils/Types';
import '../styles/components/App.css';

type AppProps = {};
type AppState = {
    currentStall: StallInfo | undefined;
    currentUser: User | undefined;
};

/**
 * The App class is our main component!
 */
class App extends Component<AppProps, AppState> {
    constructor(props: AppProps) {
        super(props);
        this.state = {
            currentStall: undefined,
            currentUser: undefined,
        }

        this.getStallInfo = this.getStallInfo.bind(this);
        this.setCurrentUser = this.setCurrentUser.bind(this);
        this.onRatingChange = this.onRatingChange.bind(this);
        this.onTaleVote = this.onTaleVote.bind(this);
        this.onTaleSubmit = this.onTaleSubmit.bind(this);
    }

    componentDidMount() {
        // TODO: remove after testing
        /*
        Api.createStall('1234 Mars Ave. Suite 4G', 'Smelliest Stall')
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            })
        */
    }

    /**
     * Gets stall info
     * @param stallId - stall id to send to API
     */
    getStallInfo(stallId: number) {
        // TODO: change to API call
        /*
        Api.getStallInfo(stallId)
            .then((res) => {
                let stallInfo = res.data;
                stallInfo.id = stallId;
                this.setState({ currentStall: stallInfo });
            })
            .catch((err) => {
                window.location.replace(Routes.STALL_NOT_FOUND);
            });
        */

        let stallInfo: StallInfo = {
            stallId: 1,
            address: '1234 End of World Suite 4G',
            name: 'Smelly Stall #120',
            myRating: 4,
            tales: [
                { taleId: 1, taleText: 'Damn, that was a rough one.', username: 'Adnan', currentScore: 13, voted: true }, 
                { taleId: 2, taleText: 'Testing how long text can be without preview. How about this much?', username: 'Dom', currentScore: 145, voted: false }, 
                { taleId: 3, taleText: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. ', username: 'Taylor', currentScore: 1323, voted: false }, 
                { taleId: 4, taleText: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. ', username: 'Andres', currentScore: 5, voted: true }, 
            ],
            ratings: [
                { score: 3 },
                { score: 5 },
                { score: 4 },
            ],
        }
        
        this.setState({ currentStall: stallInfo });
    }

    /**
     * Sets current user locally after either registering or loging in
     * @param user - user to login as
     */
    setCurrentUser(user: User): void {
        this.setState({ currentUser: user });
    }

    /**
     * Callback when stall rating is changed. API post call is also made.
     * @param rating - new stall rating
     */
    onRatingChange(rating: number): void {
        // TODO: change to Api call
        /*
        const { currentStall } = this.state;
        Api.rateStall(currentStall.id, rating)
            .then((res) => {
                const newStallInfo = currentStall;
                newStallInfo.myRating = rating;
                this.setState({ currentStall: newStallInfo });
            })
            .catch((err) => {
                console.log('Could not rate stall');
            });
        */

        const newStallInfo = this.state.currentStall;
        newStallInfo.myRating = rating;
        this.setState({ currentStall: newStallInfo });
    }

    /**
     * Callback on tale voting. Updates stall object locally if API call is successful.
     * @param taleIndex - tale index to vote
     * @param vote - true if upvote, false if downvote
     */
    onTaleVote(taleIndex: number, vote: boolean) {
        // TODO: change to Api call
        /*
        const { currentStall } = this.state;
        Api.voteTale(currentStall.tales[taleIndex].taleId, vote)
            .then((res) => {
                const newStallInfo = currentStall;
                newStallInfo.tales[taleIndex].currentScore += vote ? 1 : -1;
                newStallInfo.tales[taleIndex].voted = vote;
                this.setState({ currentStall: newStallInfo });
            })
            .catch((err) => {
                console.log('Could not vote on tale');
            });
        */

        const newStallInfo = this.state.currentStall;
        newStallInfo.tales[taleIndex].currentScore += vote ? 1 : -1;
        newStallInfo.tales[taleIndex].voted = vote;
        this.setState({ currentStall: newStallInfo });
    }

    /**
     * Callback when user submits a new tale.
     * @param taleText - text of tale
     * @param stallId - stall id to post tale to
     */
    onTaleSubmit(taleText: string, stallId: number) {
        // TODO: change to Api call
        /*
        const { currentStall } = this.state;
        Api.submitTale(taleText, stallId)
            .then((res) => {
                const newStallInfo = currentStall;
                const newLocalTale: StallTale = { 
                    taleId: res.taleId,
                    taleText, 
                    username: currentUser.username,
                    currentScore: 0,
                    voted: false
                };
                newStallInfo.tales.unshift(newLocalTale);
                this.setState({ currentStall: newStallInfo });
            })
            .catch((err) => {
                console.log('Could not submit tale');
            });
        */

        const { currentStall, currentUser } = this.state;
        const newStallInfo = currentStall;
        const newLocalTale: StallTale = { taleId: 5, taleText, username: currentUser.username, currentScore: 0, voted: false };
        newStallInfo.tales.unshift(newLocalTale);
        this.setState({ currentStall: newStallInfo });
    }

    /**
     * Our implementation of the render function
     *
     * @return {JSX.Element}
     */
    render (): JSX.Element {
        const { currentStall, currentUser } = this.state;

        return (
            <Router>
                <Switch>
                    <Route 
                        path={`${Routes.STALL_INFO}/:stallid`} 
                        exact
                        component={() => <StallInfoScreen currentStall={currentStall} getStallInfo={this.getStallInfo} />}
                    />
                    <Route 
                        path={`${Routes.STALL_HOME}/:stallid`} 
                        exact
                        component={() => <StallHomeScreen currentStall={currentStall} currentUser={currentUser} getStallInfo={this.getStallInfo} onRatingChange={this.onRatingChange} onTaleVote={this.onTaleVote} />}
                    />
                    <Route 
                        path={`${Routes.STALL_WRITE}/:stallid`} 
                        exact
                        component={() => <TaleWriteScreen currentStall={currentStall} currentUser={currentUser} getStallInfo={this.getStallInfo} onTaleSubmit={this.onTaleSubmit} />}
                    />
                    <Route path={Routes.REGISTER} component={() => <RegisterScreen setCurrentUser={this.setCurrentUser} />} />
                    <Route path={Routes.STALL_NOT_FOUND} exact component={StallNotFoundScreen} />
                    <Route component={HomeScreen} />
                </Switch>
            </Router>
        );
    }
}

export default App;
