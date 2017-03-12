// src/components/About/index.js
import React, { PropTypes, Component } from 'react';
import classnames from 'classnames';
import Theme from '../../theme';

import './style.css';

export class Header extends Component {
    static propTypes = {
        title: React.PropTypes.string
    }
    // static defaultProps = {}
    // state = {
    //     challenges: []
    // }

    // constructor(props){
    //     super(props);
    //     this.state = {
    //         challenges: []
    //     }
    // }



    render() {
        const {className} = this.props;


        return (
            <header className={classnames('Header', className)} style={{backgroundColor: Theme.palette.primary1Color}}>
                {this.props.title ? <h1>{this.props.title}</h1> : null }
            </header>
        );
    }
}