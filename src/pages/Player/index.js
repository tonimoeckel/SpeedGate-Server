// src/components/About/index.js
import React, { PropTypes, Component } from 'react';
import classnames from 'classnames';
import Formsy from 'formsy-react';
import FlatButton from 'material-ui/FlatButton';
import FormsyText from 'formsy-material-ui/lib/FormsyText';
import Subheader from 'material-ui/Subheader';
import AppBar from 'material-ui/AppBar';
import Paper from 'material-ui/Paper';
import axios from 'axios';

import './style.css';

export default class Player extends Component {
    // static propTypes = {
    //     player: React.PropTypes.object
    // }
    // static defaultProps = {
    //     player: null
    // }

    state = {
        player: null,
        valid: false
    }



    onValid = () => {
        this.setState({
            valid: true
        });
    }

    onInvalid = () => {
        this.setState({
            valid: false
        });
    }

    submit = (model) => {


        let me = this;
        let action = this.state.player.id ? axios.put("/api/players/"+this.state.player.id,model) : axios.post("/api/players",model);
        action.then((result) => {
            me.setState({
                player: result.data
            })
        });

    }

    onLeftIconButtonTouchTap = () => {
        this.props.history.push('/players');
    }


    componentDidMount() {

        let id = this.props.match.params.id;
        if (id){
            let me = this;
            this.serverRequest =
                axios
                    .get("/api/players/"+id)
                    .then(function(result) {
                        console.log(result.data);
                        me.setState({
                            player: result.data
                        });
                    })
        }else {
            this.setState({
                player: {}
            });
        }

    }

    componentWillUnmount() {

    }


    render() {
        const {className, ...props} = this.props;
        const paperStyle = {
            maxWidth: 800,
            width: '100%',
            marginTop: 20,
            textAlign: 'center',
            display: 'inline-block',
        };

        let player = this.state.player || {};
        let start = this.state.player && this.state.player.start ? this.state.player.start : {};
        let stop = this.state.player && this.state.player.stop ? this.state.player.stop : {};

        return (

            <div className={classnames('Player',className)}>
                <AppBar
                    title="Player"
                    iconClassNameRight="muidocs-icon-navigation-expand-more"
                    onLeftIconButtonTouchTap={this.onLeftIconButtonTouchTap}
                />
                <Paper style={paperStyle} zDepth={2}>
                    <div className="formContainer">
                        <Formsy.Form onValidSubmit={this.submit} onValid={this.onValid} onInvalid={this.onInvalid}>
                            <Subheader>Details</Subheader>
                            <FormsyText
                                required
                                name="name"
                                value={player.name}
                                floatingLabelText="Name"
                            /><br />
                            
                            <FlatButton type="submit" disabled={!this.state.valid} label="Submit" />
                        </Formsy.Form>
                    </div>

                </Paper>
            </div>


        );
    }
}