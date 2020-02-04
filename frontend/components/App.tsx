// -- Third party imports -- //
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom";

// -- Our imports -- //
import StallNotFoundScreen from '../screens/StallNotFoundScreen';
import ServerDownScreen from '../screens/ServerDownScreen';
import HomeScreen from '../screens/HomeScreen';
import RegisterScreen from '../screens/RegisterScreen';
import StallInfoScreen from '../screens/StallInfoScreen';
import StallHomeScreen from '../screens/StallHomeScreen';
import TaleWriteScreen from '../screens/TaleWriteScreen';

import Api from '../utils/modules/Api';
import { Routes } from '../utils/Routes';
import { StallInfo, User } from '../utils/Types';
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
        this.getUsername = this.getUsername.bind(this);
        this.setCurrentUser = this.setCurrentUser.bind(this);
        this.onRatingChange = this.onRatingChange.bind(this);
        this.onTaleVote = this.onTaleVote.bind(this);
        this.onTaleSubmit = this.onTaleSubmit.bind(this);
    }

    /**
     * Gets stall info
     * @param stallId - stall id to send to API
     */
    getStallInfo(stallId: number) {
        Api.getStallInfo(stallId)
            .then((res) => {
                let stallInfo = res.data;
                stallInfo.id = stallId;
                console.log(res.data);
                this.setState({ currentStall: stallInfo });
            })
            .catch((err) => {
                window.location.replace(Routes.STALL_NOT_FOUND);
            });
    }

    /**
     * Get current username from API when token is already set
     */
    getUsername(): void {
        Api.getUsername()
            .then((res) =>{
                const user: User = { username: res.data.username };
                this.setState({ currentUser: user });
            })
            .catch((err) => {
                console.log('User is not authenticated.');
                const stallId = window.location.pathname.split('/').slice(-1)[0];
                window.location.replace(`${Routes.REGISTER}/${stallId}`);
            });
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
        const { currentStall } = this.state;
        Api.rateStall(currentStall.id, rating)
            .then((res) => {
                this.getStallInfo(currentStall.id);
            })
            .catch((err) => {
                console.log('Could not rate stall');
            });
    }

    /**
     * Callback on tale voting. Updates stall object locally if API call is successful.
     * @param taleIndex - tale index to vote
     * @param vote - true if upvote, false if downvote
     */
    onTaleVote(taleIndex: number, vote: boolean) {
        const { currentStall } = this.state;
        Api.voteTale(currentStall.tales[taleIndex].id, vote)
            .then((res) => {
                this.getStallInfo(currentStall.id);
            })
            .catch((err) => {
                console.log('Could not vote on tale');
            });
    }

    /**
     * Callback when user submits a new tale.
     * @param taleText - text of tale
     * @param stallId - stall id to post tale to
     */
    onTaleSubmit(taleText: string, stallId: number) {
        const { currentStall, currentUser } = this.state;
        Api.submitTale(taleText, stallId)
            .then((res) => {
                this.getStallInfo(stallId);
            })
            .catch((err) => {
                console.log('Could not submit tale');
            });
    }

    /**
     * Our implementation of the render function
     *
     * @return {JSX.Element}
     */
    render(): JSX.Element {
        const { currentStall, currentUser } = this.state;

        return (
            <Router>
                <Switch>
                    <Route
                        path={`${Routes.STALL_INFO}/:stallid`}
                        exact
                        component={() => <StallInfoScreen />}
                    />
                    <Route
                        path={`${Routes.STALL_HOME}/:stallid`}
                        exact
                        component={() => 
                            <StallHomeScreen
                                currentStall={currentStall}
                                currentUser={currentUser}
                                getStallInfo={this.getStallInfo}
                                onRatingChange={this.onRatingChange}
                                onTaleVote={this.onTaleVote}
                                getUsername={this.getUsername}
                            />
                        }
                    />
                    <Route
                        path={`${Routes.STALL_WRITE}/:stallid`}
                        exact
                        component={() => 
                            <TaleWriteScreen
                                currentStall={currentStall}
                                currentUser={currentUser}
                                getStallInfo={this.getStallInfo}
                                onTaleSubmit={this.onTaleSubmit}
                                getUsername={this.getUsername}
                            />
                        }
                    />
                    <Route path={Routes.REGISTER} component={() => <RegisterScreen setCurrentUser={this.setCurrentUser} />} />
                    <Route path={Routes.STALL_NOT_FOUND} exact component={StallNotFoundScreen} />
                    <Route path={Routes.SERVER_DOWN} exact component={ServerDownScreen} />
                    <Route component={HomeScreen} />
                </Switch>
            </Router>
        );
    }
}

export default App;
