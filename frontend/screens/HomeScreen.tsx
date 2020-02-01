// -- Third party imports -- //
import React, { Component } from 'react';

// -- Our imports -- //

/**
 * The Home Screen class is loaded when no stall is specified on URL!
 */
class HomeScreen extends Component {
    /**
     * Our implementation of the render function
     *
     * @return {JSX.Element}
     */
    render (): JSX.Element {
        return (
            <div>
                <p>Not implemented yet. To test stall go here:</p>
                <a href="/stall/info/randomid">Link to stall</a>
            </div>
        );
    }
}

export default HomeScreen;
