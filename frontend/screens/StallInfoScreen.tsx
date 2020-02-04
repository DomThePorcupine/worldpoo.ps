// -- Third party imports -- //
import React, { Component } from 'react';
import { RouteComponentProps } from 'react-router';
import { withRouter } from 'react-router-dom';

// -- Our imports -- //
import DefaultHeader from '../components/default/DefaultHeader';
import DefaultText from '../components/default/DefaultText';
import DefaultPrimaryButton from '../components/default/DefaultPrimaryButton';
import Loading from '../components/Loading';
import { TempStallInfo } from '../utils/Types';
import toiletImg from '../assets/toilet.png';
import { Routes } from '../utils/Routes';
import Api from '../utils/modules/Api';
import '../styles/screens/StallInfoScreen.css';

type StallInfoScreenProps = RouteComponentProps & {
    history: any;
};
type StallInfoScreenState = {
    noAuthCurrentStall: TempStallInfo | undefined;
};

/**
 * The StallInfoScreen is loaded when a user scans a QR code!
 */
class StallInfoScreen extends React.Component<StallInfoScreenProps, StallInfoScreenState> {
    stallId: number;

    constructor(props: StallInfoScreenProps) {
        super(props);
        this.state = {
            noAuthCurrentStall: undefined,
        }

        this.stallId = parseInt(window.location.pathname.split('/').slice(-1)[0]);
    }

    /**
     * Get stall based on stallId in URL.
     */
    componentDidMount() {
        Api.getNoAuthStallInfo(this.stallId)
            .then((res) => {
                this.setState({
                    noAuthCurrentStall: {
                        id: this.stallId,
                        name: res.data.name
                    }
                });
            })
            .catch((err) => {
                // TODO: route to server is down view?
                console.log('Server is down');
            });
    }

    render() {
        const { noAuthCurrentStall } = this.state;
        const { history } = this.props;

        if (!noAuthCurrentStall) {
            return <Loading text="Loading stall..." />;
        }

        return (
            <div className="stallInfoContainer">
                <div className="stallInfoContent">
                    <div className="stallInfoHeaderContainer">
                        <DefaultHeader className="stallInfoScreenHeader" text={"Welcome to "} />
                        <DefaultHeader className="stallInfoScreenStallName" text={`${noAuthCurrentStall.name}!`} />
                    </div>
                    <img className="stallInfoToilet" src={toiletImg} />
                    <DefaultText className="stallInfoReadText" text="Read about stories that happened in the same exact stall you are in!" />
                    <DefaultText className="stallInfoShareText" text="Share your experience with those who will use this stall in the future!" />
                    <DefaultPrimaryButton 
                        className="stallInfoActionBtn"
                        text="Read Stories" 
                        onClick={() => {
                            history.push(`${Routes.STALL_HOME}/${noAuthCurrentStall.id}`)
                        }} 
                    />
                </div>
            </div>
        )
    }
};

export default withRouter(StallInfoScreen);
