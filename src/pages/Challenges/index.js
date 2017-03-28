// src/components/About/index.js
import React, { PropTypes, Component } from 'react';
import axios from 'axios';
import classnames from 'classnames';
import {Header} from './../../components/Header';
import {List, ListItem} from 'material-ui/List';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import AppBar from 'material-ui/AppBar';
import ContentAdd from 'material-ui/svg-icons/content/add';
import {
    Link
} from 'react-router-dom'

import './style.css';

export default class Challenges extends Component {
    // static propTypes = {}
    // static defaultProps = {}
    state = {
        challenges: []
    }

    // constructor(props){
    //     super(props);
    //     this.state = {
    //         challenges: []
    //     }
    // }

    componentDidMount() {

        let me = this;
        this.serverRequest =
            axios
                .get("/api/challenges")
                .then(function(result) {
                    console.log(result.data);
                    me.setState({
                        challenges: result.data.data
                    });
                })
    }

    componentWillUnmount() {
    }

    onLeftIconButtonTouchTap = () => {
        document.dispatchEvent(new Event("ReactComponent:App:OpenDrawer"));
    }




    render() {
        const {className, ...props} = this.props;

        let listItems = this.state.challenges.map((item)=>

            <Link key={item.id} to={"challenges/"+item.id}>
                <ListItem
                    primaryText={item.title}
                />
            </Link>

        );

        const floatingButtonStyle = {
            marginRight: 20,
            position: 'absolute',
            right: '20px',
            top: '-30px',
            zIndex: 1101
        };

        return (
            <div className={classnames('Challenges', className)}>
                <AppBar
                    title="Challenges"
                    onLeftIconButtonTouchTap={this.onLeftIconButtonTouchTap}
                />
                <Header title={'Challenges'}/>
                <div style={{position: 'relative'}}>
                    <Link to="challenges/create">
                        <FloatingActionButton secondary={true} style={floatingButtonStyle}>
                            <ContentAdd />
                        </FloatingActionButton>
                    </Link>

                    <List>
                        {listItems}
                    </List>
                </div>
            </div>
        );
    }
}