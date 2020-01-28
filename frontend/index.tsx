import * as React from "react";
import * as ReactDOM from "react-dom";
import App from "./components/App";

export class AppContainer
{
    private _appName: string = "World Poops";

    constructor()
    {
        this.render();
    }

    private render(): void
    {
        ReactDOM.render(React.createElement(App, { app: this }), document.getElementById("app"));
    }

    public get appName(): string { return this._appName; }
}

new AppContainer();