// -- Third party imports -- //
import React, { Component } from 'react';
import { RouteComponentProps } from 'react-router';
import { withRouter } from 'react-router-dom';

// -- Our imports -- //
import DefaultHeader from '../components/default/DefaultHeader';
import DefaultTextArea from '../components/default/DefaultTextArea';
import DefaultPrimaryButton from '../components/default/DefaultPrimaryButton';
import DefaultTopBar from '../components/default/DefaultTopBar';
import Loading from '../components/Loading';
import { StallInfo, TopNavButton, User } from '../utils/Types';
import { Routes } from '../utils/Routes';
import '../styles/screens/TaleWriteScreen.css';

type TaleWriteScreenProps = RouteComponentProps & {
    history: any;
    currentStall: StallInfo | undefined;
    currentUser: User | undefined;
    getStallInfo: (stallId: string) => void;
    onTaleSubmit: (taleText: string, stallId: number) => void;
};

type TaleWriteScreenState = {
    taleText: string;

};

let leftButton: TopNavButton;

/**
 * The StoryWriteScreen is loaded when a user presses "Write Story"
 */
class TaleWriteScreen extends Component<TaleWriteScreenProps, TaleWriteScreenState> {
    constructor(props: TaleWriteScreenProps) {
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

    /**
     * In the case that the user logs in straight with the URL, we want to get the stall and login first.
     */
    componentDidMount() {
        const { history, currentStall, currentUser, getStallInfo } = this.props;
        const stallId = window.location.pathname.split('/').slice(-1)[0];

        if (!currentStall) {
            getStallInfo(stallId);
        } else if (!currentUser) {
            // history.replace(`${Routes.REGISTER}/${stallId}`);
        }
    }

    /**
     * Callback on new text for tale
     * @param e - event
     */
    onTaleTextChange(e: any): void {
        this.setState({ taleText: e.target.value });
    }

    /**
     * Submit tale and go back to stall home
     */
    submitTale(): void {
        const { taleText } = this.state;
        const stallId = window.location.pathname.split('/').slice(-1)[0];
        this.props.onTaleSubmit(taleText, stallId);
        this.props.history.push(`${Routes.STALL_HOME}/${stallId}`);
    }

    /**
     * Our implementation of the render function
     *
     * @return {JSX.Element}
     */
    render(): JSX.Element {
        if (!this.props.currentStall) {
            return <Loading text="Loading stall..." />
        }

        const { taleText } = this.state;
        return (
            <div>
                <DefaultTopBar leftButton={leftButton} />
                <div className="taleWriteContainer">
                    <DefaultHeader className="taleWriteHeader" text={'Tell us a tale!'} />
                    <DefaultTextArea
                        className="taleWriteTextArea"
                        placeholder={'It was late at night ...'}
                        value={taleText}
                        onValueChange={this.onTaleTextChange}
                    />
                    <DefaultPrimaryButton
                        className="taleWriteSubmitBtn"
                        onClick={this.submitTale}
                        text={"Submit Tale"}
                        disabled={!taleText}
                    />
                </div>
            </div>
        );
    }
}

export default withRouter(TaleWriteScreen);
