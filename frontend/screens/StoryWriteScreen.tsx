// -- Third party imports -- //
import React, { Component } from 'react';
import { RouteComponentProps } from 'react-router';
import { withRouter } from 'react-router-dom';

// -- Our imports -- //
import DefaultHeader from '../components/default/DefaultHeader';
import DefaultTextArea from '../components/default/DefaultTextArea';
import DefaultPrimaryButton from '../components/default/DefaultPrimaryButton';
import DefaultTopBar from '../components/default/DefaultTopBar';
import Api from '../utils/modules/Api';
import { StallInfo, TopNavButton, User } from '../utils/Types';
import { Routes } from '../utils/Routes';
import '../styles/screens/StoryWriteScreen.css';

type StoryWriteScreenProps = RouteComponentProps & {
    history: any;
    currentStall: StallInfo | undefined;
    currentUser: User | undefined;
    getStallInfo: (stallId: string) => void;
};

type StoryWriteScreenState = {
    taleText: string;

};

let leftButton: TopNavButton;

/**
 * The StoryWriteScreen is loaded when a user presses "Write Story"
 */
class StoryWriteScreen extends Component<StoryWriteScreenProps, StoryWriteScreenState> {
    constructor(props: StoryWriteScreenProps) {
        super(props);
        this.state = {
            taleText: ''
        }

        const stallId = window.location.pathname.split('/').slice(-1)[0];
        leftButton = {
            text: 'Back',
            onClick: () => { this.props.history.push(`${Routes.STALL_HOME}/${stallId}`) }
        }

        this.onTaleTextChange = this.onTaleTextChange.bind(this);
        this.submitTale = this.submitTale.bind(this);
    }

    componentDidMount() {
        // Check if user is logged in
        if (!this.props.currentUser) {
            const stallId = window.location.pathname.split('/').slice(-1)[0];
            this.props.history.replace(`${Routes.REGISTER}/${stallId}`);
        }
    }

    onTaleTextChange(e: any): void {
        this.setState({ taleText: e.target.value });
    }

    submitTale(): void {
        // TODO: API POST
        const { taleText } = this.state;
        const stallId = window.location.pathname.split('/').slice(-1)[0];

        /*
        Api.submitTale(taleText, stallId)
            .then((res) => {
                this.props.history.push(`${Routes.STALL_HOME}/${stallId}`);
            })
            .catch((err) => {

            });
        */

        this.props.history.push(`${Routes.STALL_HOME}/${stallId}`);
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

        const { taleText } = this.state;
        return (
            <div>
                <DefaultTopBar leftButton={leftButton} />
                <div className="storyWriteContainer">
                    <DefaultHeader className="storyWriteHeader" text={'Tell us a story!'} />
                    <DefaultTextArea
                        className="storyWriteTextArea" 
                        placeholder={'It was late at night ...'}
                        value={taleText} 
                        onValueChange={this.onTaleTextChange} 
                    />
                    <DefaultPrimaryButton
                        className="storyWriteSubmitBtn"
                        onClick={this.submitTale}
                        text={"Submit Story"}
                        disabled={!taleText}
                    />
                </div>
            </div>
        );
    }
}

export default withRouter(StoryWriteScreen);
