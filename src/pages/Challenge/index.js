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

export default class Challenge extends Component {
    // static propTypes = {
    //     challenge: React.PropTypes.object
    // }
    // static defaultProps = {
    //     challenge: null
    // }

    state = {
        challenge: null,
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
        let action = this.state.challenge.id ? axios.put("/api/challenges/"+this.state.challenge.id,model) : axios.post("/api/challenges",model);
        action.then((result) => {
            me.setState({
                challenge: result.data
            })
        });

    }

    onLeftIconButtonTouchTap = () => {
        this.props.history.push('/challenges');
    }


    componentDidMount() {

        let id = this.props.match.params.id;
        if (id){
            let me = this;
            this.serverRequest =
                axios
                    .get("/api/challenges/"+id)
                    .then(function(result) {
                        console.log(result.data);
                        me.setState({
                            challenge: result.data
                        });
                    })
        }else {
            this.setState({
                challenge: {}
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

        let challenge = this.state.challenge || {};
        let start = this.state.challenge && this.state.challenge.start ? this.state.challenge.start : {};
        let stop = this.state.challenge && this.state.challenge.stop ? this.state.challenge.stop : {};

        return (

            <div className={classnames('Challenge',className)}>
                <AppBar
                    title="Challenge"
                    iconClassNameRight="muidocs-icon-navigation-expand-more"
                    onLeftIconButtonTouchTap={this.onLeftIconButtonTouchTap}
                />
                <Paper style={paperStyle} zDepth={2}>
                    <div className="formContainer">
                        <Formsy.Form onValidSubmit={this.submit} onValid={this.onValid} onInvalid={this.onInvalid}>
                            <Subheader>Details</Subheader>
                            <FormsyText
                                required
                                name="title"
                                value={challenge.title}
                                floatingLabelText="Title"
                            /><br />
                            <Subheader>Start</Subheader>
                            <FormsyText
                                name="start.emitterId"
                                value={start.emitterId}
                                floatingLabelText="Emitter"
                            /><br />
                            <FormsyText
                                name="start.count"
                                value={start.count}
                                floatingLabelText="Count"
                            /><br />
                            <FormsyText
                                name="start.value"
                                value={start.value}
                                floatingLabelText="Value"
                            /><br />
                            <Subheader>Stop</Subheader>
                            <FormsyText
                                name="stop.emitterId"
                                value={stop.emitterId}
                                floatingLabelText="Emitter"
                            /><br />
                            <FormsyText
                                name="stop.count"
                                value={stop.count}
                                floatingLabelText="Count"
                            /><br />
                            <FormsyText
                                name="stop.value"
                                value={stop.value}
                                floatingLabelText="Value"
                            /><br />
                            <FlatButton type="submit" disabled={!this.state.valid} label="Submit" />
                        </Formsy.Form>
                    </div>

                </Paper>
            </div>


        );
    }
}