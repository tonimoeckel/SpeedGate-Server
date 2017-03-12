import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import Routes from './routes';
import Theme from './theme';

import './index.css';

injectTapEventPlugin();



ReactDOM.render(
    <MuiThemeProvider muiTheme={Theme}><Routes /></MuiThemeProvider>,
    document.getElementById('root')
);
