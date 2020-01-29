// -- Third party imports -- //
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

// -- Our imports -- //
import HomeScreen from '../screens/HomeScreen';
import StallInfoScreen from '../screens/StallInfoScreen';
import StallHomeScreen from '../screens/StallHomeScreen';
import { Routes } from '../utils/Routes';
import { StallInfo } from '../utils/Types';
import '../styles/components/App.css';

type AppProps = {};
type AppState = {
    currentStall: StallInfo | undefined;
};

/**
 * The App class is our main component!
 */
class App extends Component<AppProps, AppState> {
    constructor(props: AppProps) {
        super(props);
        this.state = {
            currentStall: undefined
        }

        this.getStallInfo = this.getStallInfo.bind(this);
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
        
        this.setState({ currentStall: result });
    }

    /**
     * Our implementation of the render function
     *
     * @return {JSX.Element}
     */
    render (): JSX.Element {
        return (
            <Router>
                <Route path={Routes.HOME} exact component={HomeScreen} />
                <Route 
                    path={Routes.STALL_INFO} 
                    exact
                    component={() => 
                        <StallInfoScreen 
                            currentStall={this.state.currentStall} 
                            getStallInfo={this.getStallInfo} 
                        />
                    }
                />
                <Route 
                    path={Routes.STALL_HOME} 
                    exact
                    component={() => 
                        <StallHomeScreen 
                            currentStall={this.state.currentStall} 
                            getStallInfo={this.getStallInfo} 
                        />
                    }
                />
            </Router>
        );
    }
}

export default App;
