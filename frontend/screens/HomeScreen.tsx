// -- Third party imports -- //
import React, { Component } from 'react';
import SwipeableViews from 'react-swipeable-views';

// -- Our imports -- //
import DefaultHeader from '../components/default/DefaultHeader';
import DefaultText from '../components/default/DefaultText';
import DefaultPrimaryButton from '../components/default/DefaultPrimaryButton';
import Api from '../utils/modules/Api';
import { Routes } from '../utils/Routes';
import poopImg from '../assets/crap.png';
import qrCodeImg from '../assets/qr-code.png';
import phoneImg from '../assets/phone.png';
import '../styles/screens/HomeScreen.css';

export type HomeScreenProps = {};
export type HomeScreenState = {
    currentStepIndx: number;
};

/**
 * The Home Screen class is loaded when no stall is specified on URL!
 */
class HomeScreen extends Component<HomeScreenProps, HomeScreenState> {
    constructor(props) {
        super(props);
        this.state = {
            currentStepIndx: 0
        }

        this.goToRandomStall = this.goToRandomStall.bind(this);
    }

    goToRandomStall(): void {
        Api.getRandomStall()
            .then((res) => {
                window.location.replace(Routes.STALL_INFO + '/' + res.data.id);
            })
            .catch((err) => {
                console.log('couldnt get random stall')
            })
    }

    /**
     * Our implementation of the render function
     *
     * @return {JSX.Element}
     */
    render(): JSX.Element {
        const { currentStepIndx } = this.state;
        return (
            <div className="homeScreenContainer">
                <SwipeableViews className="homeScreenSwipeContainer" enableMouseEvents onChangeIndex={(index: number) => { this.setState({ currentStepIndx: index }) }}>
                    <div className="homeScreenSwipeView">
                        <div className="homeScreenSwipeViewContainer">
                            <div className="homeScreenSwipeViewContent">
                                <img className="homeScreenImg" src={poopImg} />
                                <DefaultHeader className="homeScreenAppName" text="World Poops" />
                                <DefaultText className="homeScreenBlurb" text="Our goal is to entertain while you poop. It's as simple as that." />
                            </div>
                        </div>
                        <DefaultText className="homeScreenSwipetext" text="Swipe to continue" />
                    </div>
                    <div className="homeScreenSwipeView">
                        <div className="homeScreenSwipeViewContainer">
                            <div className="homeScreenSwipeViewContent">
                                <DefaultHeader className="homeScreenStepHeader" text="Find our QR code on select bathroom stalls!" />
                                <img className="homeScreenStepImg" src={qrCodeImg} />
                            </div>
                        </div>
                        <DefaultText className="homeScreenSwipetext" text="Swipe to continue" />
                    </div>
                    <div className="homeScreenSwipeView">
                        <div className="homeScreenSwipeViewContainer">
                            <div className="homeScreenSwipeViewContent">
                                <DefaultHeader className="homeScreenStepHeader" text="Scan the code with your phone and read and share stall tales!" />
                                <img className="homeScreenStepImg" src={phoneImg} />
                            </div>
                        </div>
                        <DefaultText className="homeScreenSwipetext" text="Swipe to continue" />
                    </div>
                    <div className="homeScreenSwipeView">
                        <div className="homeScreenSwipeViewContainer">
                            <div className="homeScreenSwipeViewContent">
                                <DefaultHeader className="homeScreenStepHeader" text="Curious to see what these stories look like?" />
                                <DefaultPrimaryButton className="homeScreenRandomStallBtn" text="Go to random stall" onClick={this.goToRandomStall} />
                            </div>
                        </div>
                    </div>
                </SwipeableViews>
                <div className="homeScreenSwipeIndexContainer">
                    <div className={`homeScreenSwipeIndexCircle ${currentStepIndx === 0 && 'homeScreenSwipeIndexActive'}`} />
                    <div className={`homeScreenSwipeIndexCircle ${currentStepIndx === 1 && 'homeScreenSwipeIndexActive'}`} />
                    <div className={`homeScreenSwipeIndexCircle ${currentStepIndx === 2 && 'homeScreenSwipeIndexActive'}`} />
                    <div className={`homeScreenSwipeIndexCircle ${currentStepIndx === 3 && 'homeScreenSwipeIndexActive'}`} />
                </div>
            </div>
        );
    }
}

export default HomeScreen;
