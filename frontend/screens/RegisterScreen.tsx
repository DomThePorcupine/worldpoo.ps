// -- Third party imports -- //
import React, { Component } from 'react';
import { RouteComponentProps } from 'react-router';
import { withRouter } from 'react-router-dom';
import { hri } from 'human-readable-ids';

// -- Our imports -- //
import DefaultHeader from '../components/default/DefaultHeader';
import DefaultText from '../components/default/DefaultText';
import DefaultTextInput from '../components/default/DefaultTextInput';
import DefaultPrimaryButton from '../components/default/DefaultPrimaryButton';
import randomImg from '../assets/random.png';
import Api from '../utils/modules/Api';
import { User } from '../utils/Types';
import { Routes } from '../utils/Routes';
import '../styles/screens/RegisterScreen.css';

type RegisterScreenProps = RouteComponentProps & {
    setCurrentUser: (user: User) => void;
};
type RegisterScreenState = {
    username: string;
    password: string;
    error: string;
    registerState: boolean;
}

class RegisterScreen extends Component<RegisterScreenProps, RegisterScreenState> {
    constructor(props: RegisterScreenProps) {
        super(props);
        this.state = {
            username: '',
            password: '',
            error: '',
            registerState: true
        }

        this.onUsernameChange = this.onUsernameChange.bind(this);
        this.onPasswordChange = this.onPasswordChange.bind(this);
        this.onGenerateUsername = this.onGenerateUsername.bind(this);
        this.onRegisterClick = this.onRegisterClick.bind(this);
        this.toggleSignIn = this.toggleSignIn.bind(this);
        this.onLoginClick = this.onLoginClick.bind(this);
    }

    onUsernameChange(e: any): void {
        this.setState({ username: e.target.value });
    }

    onPasswordChange(e: any): void {
        this.setState({ password: e.target.value });
    }

    onGenerateUsername(): void {
        this.setState({ username: hri.random() });
    }

    onRegisterClick(): void {
        const { username, password } = this.state;
        const { setCurrentUser, history } = this.props;
        const stallId = window.location.pathname.split('/').slice(-1)[0];

        Api.registerUser(username, password)
            .then((res) => {
                Api.loginUser(username, password)
                    .then((res) => {
                        const newUser: User = { username };
                        setCurrentUser(newUser);
                        history.replace(Routes.HOME);
                    })
                    .catch((err) => {
                        this.setState({ error: 'Invalid username or password.' });
                    });
            })
            .catch((err) => {
                this.setState({ error: 'Username already exists.' });
            });
    }

    toggleSignIn(): void {
        const { registerState } = this.state;
        this.setState({ registerState: !registerState, error: '' });
    }

    onLoginClick(): void {
        const { username, password } = this.state;
        const { setCurrentUser, history } = this.props;
        const stallId = window.location.pathname.split('/').slice(-1)[0];

        Api.loginUser(username, password)
            .then((res) => {
                const newUser: User = { username };
                setCurrentUser(newUser);
                history.replace(Routes.HOME);
            })
            .catch((err) => {
                this.setState({ error: 'Invalid username or password.' });
            });
    }

    render() {
        const { username, password, error, registerState } = this.state;
        return (
            <div className="registerScreenContainer">
                <DefaultHeader className="registerScreenHeader" text={'Welcome!'} />
                <div className="registerScreenUsernameContainer">
                    <div className={registerState ? 'registerScreenUsernameRegisterInputContainer' : 'registerScreenUsernameLoginInputContainer'}>
                        <DefaultText className="registerScreenInputHeader" text='Username' />
                        <DefaultTextInput className="registerScreenInput" value={username} onValueChange={this.onUsernameChange} />
                    </div>
                    {registerState && <DefaultPrimaryButton className="registerScreenGenerateUsernameBtn" onClick={this.onGenerateUsername} img={randomImg} />}
                </div>
                {error && <DefaultText className="registerScreenError" text={error} />}
                <DefaultText className="registerScreenInputHeader" text='Password' />
                <DefaultTextInput className="registerScreenInput" type={'password'} value={password} onValueChange={this.onPasswordChange} />
                <DefaultText className="registerScreenInputLogin" text='Login instead?' onClick={this.toggleSignIn} />
                {registerState ? (
                    <DefaultPrimaryButton className="registerScreenRegisterBtn" text={'Register'} onClick={this.onRegisterClick} disabled={!username || !password} />
                ) : (
                        <DefaultPrimaryButton className="registerScreenRegisterBtn" text={'Login'} onClick={this.onLoginClick} disabled={!username || !password} />
                    )}
            </div>
        )
    }
}

export default withRouter(RegisterScreen);
