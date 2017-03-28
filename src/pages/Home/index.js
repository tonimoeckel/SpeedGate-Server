// src/components/About/index.js
import React, {  Component } from 'react';
import classnames from 'classnames';
import AppBar from 'material-ui/AppBar';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ImageTimer from 'material-ui/svg-icons/image/timer';
import { Event } from 'react-socket-io';

import './style.css';

const buttonStyle = {
    margin: 50,
};

const footerContainerStyle = {
    bottom: 0,
    width: '100%',
    position: 'absolute'
}


export default class Home extends Component {
    // static propTypes = {}
    // static defaultProps = {}
    state = {
        timeString: '00:00:00',
        connected: false,
        connectedState: 'not connected',
        runningStateText: 'Unknown'
    }



    componentDidMount(){

        if (this.context.socket){
            let me = this;
            me.updateConnectionState(this.context.socket);
            this.context.socket.on('connect', function() {
                me.updateConnectionState(me.context.socket);
            });
        }
    }

    updateConnectionState(socket){
        this.setState({
            connected: socket.connected,
            connectedState: socket.status
        });
    }

    updateRunningState(state){

        let stateText = 'Idle';
        if (state.status === 0){
            stateText = 'Ready';
        }
        if (state.status === 1){
            stateText = 'Running';
        }


        this.setState({
            runningStateText: stateText,
            timeString: this.msToTime(state.time)
        });
    }

    msToTime(duration) {

        if (!duration){
            return "00:00.00";
        }

        var milliseconds = parseInt((duration%1000))
            , seconds = parseInt((duration/1000)%60)
            , minutes = parseInt((duration/(1000*60))%60);

        minutes = (minutes < 10) ? "0" + minutes : minutes;
        seconds = (seconds < 10) ? "0" + seconds : seconds;
        milliseconds = (milliseconds < 100) ? "0" + milliseconds : milliseconds;

        return minutes + ":" + seconds + "." + milliseconds;
    }


    onLeftIconButtonTouchTap = () => {
        document.dispatchEvent(new Event("ReactComponent:App:OpenDrawer"));
    }

    onReadyButtonTap = () => {
        this.context.socket.emit('ready');
    }

    onState = (data) => {
        this.updateRunningState(data);
    }

    onConnect(data) {
        console.log('onConnect',data);
    }

    render() {



        return (
            <div className={classnames('About', className)}>
                <AppBar
                    title="Speed Gate"
                    onLeftIconButtonTouchTap={this.onLeftIconButtonTouchTap}
                />

                <Event event='state' handler={this.onState} />
                <Event event='connect' handler={this.onConnect} />

                <div>


                    <h1>{this.state.timeString}</h1>

                    <FloatingActionButton style={buttonStyle} onTouchTap={this.onReadyButtonTap}>
                        <ImageTimer />
                    </FloatingActionButton>

                    <div style={footerContainerStyle}>
                        <p>{this.state.runningStateText}</p>
                        <p>{this.state.connectedState}</p>
                    </div>



                </div>
            </div>
        );
        const {className} = this.props;
    }
}


Home.contextTypes = {
    socket: React.PropTypes.object.isRequired
};