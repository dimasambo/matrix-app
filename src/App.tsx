import React, {Component} from 'react';
import './App.scss';
import {HashRouter, Redirect, Route, Switch, withRouter} from "react-router-dom";
import {compose} from "redux";
import {Homepage} from "./components/Homepage/Homepage";
import {Header} from "./components/Header/Header";

class App extends Component {
    render() {
        return (
            <>
                <Header/>
                <Switch>
                    <Route exact path='/'
                           render={() => <Redirect to={"/homepage"}/>}/>
                    <Route path='/homepage'>
                        <Homepage/>
                    </Route>
                </Switch>
            </>
        );
    }
}

const AppContainer = compose<React.ComponentType>(withRouter)(App);

const MatrixApp: React.FC = () => {
    return <HashRouter>
        <AppContainer/>
    </HashRouter>
}

export default MatrixApp;