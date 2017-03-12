// src/components/About/index.js
import React, { PropTypes, Component } from 'react';
import classnames from 'classnames';

import './style.css';

export default class Home extends Component {
    // static propTypes = {}
    // static defaultProps = {}
    // state = {}

    render() {
        const {className, ...props} = this.props;
        return (
            <div className={classnames('About', className)}>
                <h1>
                    Home
                </h1>
            </div>
        );
    }
}