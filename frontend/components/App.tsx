// -- Third party imports -- //
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

// -- Our imports -- //
import HomeScreen from '../screens/HomeScreen';
import StallInfoScreen from '../screens/StallInfoScreen';
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

        this.setCurrentStall = this.setCurrentStall.bind(this);
    }

    setCurrentStall(stallInfo: StallInfo) {
        this.setState({ currentStall: stallInfo });
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
                            setCurrentStall={this.setCurrentStall} 
                        />
                    }
                />
            </Router>
        );
    }
}

export default App;
