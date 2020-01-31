// -- Third party imports -- //
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom";

// -- Our imports -- //
import HomeScreen from '../screens/HomeScreen';
import RegisterScreen from '../screens/RegisterScreen';
import StallInfoScreen from '../screens/StallInfoScreen';
import StallHomeScreen from '../screens/StallHomeScreen';
import StoryWriteScreen from '../screens/StoryWriteScreen';

import Api from '../utils/modules/Api';
import { Routes } from '../utils/Routes';
import { StallInfo, User } from '../utils/Types';
import '../styles/components/App.css';

type AppProps = {};
type AppState = {
    currentStall: StallInfo | undefined;
    currentUser: User | undefined;
    loading: boolean;
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
            loading: true
        }

        this.getStallInfo = this.getStallInfo.bind(this);
        this.setCurrentUser = this.setCurrentUser.bind(this);
    }

    componentDidMount() {
        const { currentStall } = this.state;
        const stallId = window.location.pathname.split('/').slice(-1)[0];

        if (!currentStall) {
            // TODO: change to API call with callback
            const stallInfo = this.getStallInfo(stallId);
            this.setState({ currentStall: stallInfo }, () => {
                this.setState({ loading: false });
            });
        }
    }

    /**
     * Gets stall info
     * @param stallId - stall id to send to API
     * @return {StallInfo} - stall info
     */
    getStallInfo(stallId: string): StallInfo {
        // TODO: remove after api call
        let result: StallInfo = {
            address: '1601 Marys Ave. Suite 3G',
            name: 'Deeplocal Stall #15',
            tales: [
                { taleText: 'Damn, that was a rough one.', username: 'Adnan' }, 
                { taleText: 'Testing how long text can be without preview. How about this much?', username: 'Dom' }, 
                { taleText: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. ', username: 'Taylor' }, 
                { taleText: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. ', username: 'Andres' }, 
            ],
            ratings: [
                { score: 3 },
                { score: 5 },
                { score: 4 },
            ],
        }
        
        return result;
    }

    setCurrentUser(user: User): void {
        this.setState({ currentUser: user });
    }

    /**
     * Our implementation of the render function
     *
     * @return {JSX.Element}
     */
    render (): JSX.Element {
        const { loading, currentStall, currentUser } = this.state;

        if (loading) {
            // TODO: making loading UI
            return <div>Loading...</div>
        }

        return (
            <Router>
                <Switch>
                    <Route 
                        path={`${Routes.STALL_INFO}/:stallid`} 
                        exact
                        component={() => <StallInfoScreen currentStall={currentStall} />}
                    />
                    <Route 
                        path={`${Routes.STALL_HOME}/:stallid`} 
                        exact
                        component={() => <StallHomeScreen currentStall={currentStall} currentUser={currentUser} />}
                    />
                    <Route 
                        path={`${Routes.STALL_WRITE}/:stallid`} 
                        exact
                        component={() => <StoryWriteScreen currentStall={currentStall} currentUser={currentUser} />}
                    />
                    <Route path={Routes.REGISTER} component={() => <RegisterScreen setCurrentUser={this.setCurrentUser} />} />
                    <Route component={HomeScreen} />
                </Switch>
            </Router>
        );
    }
}

export default App;
