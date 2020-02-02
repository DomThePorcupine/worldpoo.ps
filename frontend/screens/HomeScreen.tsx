// -- Third party imports -- //
import React, { Component } from 'react';

// -- Our imports -- //
import Api from '../utils/modules/Api';
import { Routes } from '../utils/Routes';

/**
 * The Home Screen class is loaded when no stall is specified on URL!
 */
class HomeScreen extends Component {
    componentDidMount() {
        Api.getRandomStall()
            .then((res) => {
                // this.getStallInfo(res.data.id); // Get some info for the stall
                window.location.replace(Routes.STALL_HOME + '/' + res.data.id);
            })
            .catch((err) => {
                console.log('couldnt get random stall')
                // Most likely not logged in,
                // redirect to register
                window.location.replace(Routes.REGISTER);
            })
    }
    /**
     * Our implementation of the render function
     *
     * @return {JSX.Element}
     */
    render(): JSX.Element {
        return (
            <div>
                <p>Not implemented yet. To test stall go here:</p>
                <a href="/stall/info/randomid">Link to stall</a>
            </div>
        );
    }
}

export default HomeScreen;
