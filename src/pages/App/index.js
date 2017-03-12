import React, { Component } from 'react';
import classnames from 'classnames';
import logo from './logo.svg';
import About from '../About';
import Home from '../Home';
import Challenge from  '../Challenge';
import Challenges from '../Challenges';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';

import { Route, Switch } from 'react-router-dom';
import './style.css';

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            open: false
        };
    }

    componentDidMount(){
        document.addEventListener("ReactComponent:App:OpenDrawer", this.openDrawer, false);
    }

    openDrawer = () => {
        this.setState({
            open: true
        });
    }

    onLeftIconButtonTouchTap = () => {
        return this.setState({
            open: !this.state.open
        });
    }

    handleClose = () => this.setState({open: false});

    render() {
        const { className } = this.props;
        return (
            <div className={classnames('App', className)}>

                <Drawer open={this.state.open} docked={false} onRequestChange={(open) => this.setState({open})}>
                    <MenuItem onTouchTap={this.handleClose}>Challenges</MenuItem>
                    <MenuItem onTouchTap={this.handleClose}>About</MenuItem>
                </Drawer>
                <Route path="/" exact component={Home} />
                <Route path="/challenges" exact component={Challenges} />
                <Route path="/challenges/:id" exact component={Challenge} />
                <Route path="/about" component={About} />


            </div>

        );
    }
}

export default App;
