import 'normalize.css';
import './app.scss';
import { initialAction, socketAction, uiAction } from '@redux/actions';
import { IndexPage, LoginPage, UsersPage, SummaryPage, SummariesPage } from '@pages';
import { Notifier } from '@components';
import { HeaderView } from '@views';

import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withStyles } from '@material-ui/core/styles';
import { CircularProgress, Backdrop } from '@material-ui/core';
import { clientSocket } from './clientSocket';

const PrivateRoute = ({ component: Component, redirect, socket, admin: isAdmin, ...rest }) => (
  (<Route
    {...rest}
    render={props => {
      const redi = () => (<Redirect
        to={{
          pathname: redirect,
          state: {
            from: props.location
          }
        }}
      />);
      const user = JSON.parse(localStorage.getItem('user'));

      if(isAdmin && user) {
        if(user.rights === 'admin' || user.rights === 'manager') {
          return (<Component {...props} />);
        } else {
          return redi();
        }
      } else if(localStorage.getItem('userId')) {
        return (<Component {...props} />);
      } else {
        return redi();
      }
    }}
  />)
);
const useStyles = theme => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
});

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const {
      setSocket,
      InitState,
      notify,
      connected,
      closeNotify
    } = this.props;
    const socket = clientSocket({
      connected,
      closeNotify,
      notify,
    });

    setSocket(socket);
    InitState();
  }

  render() {
    const { classes } = this.props;

    return (
      <BrowserRouter>
        <div className='app-wrapper'>
          <HeaderView />
          <Switch>
            <Route
              path="/"
              component={IndexPage}
              exact
            />
            <Route
              path="/login"
              component={LoginPage}
              exact
            />
            <PrivateRoute
              socket={this.props.socket}
              path="/users"
              redirect="/"
              component={UsersPage}
              admin
              exact
            />
            <PrivateRoute
              socket={this.props.socket}
              path="/summary"
              redirect="/login"
              component={SummaryPage}
              exact
            />
            <PrivateRoute
              socket={this.props.socket}
              path="/summaries"
              redirect="/summary"
              component={SummariesPage}
              admin
              exact
            />
          </Switch>
          <Backdrop className={classes.backdrop} open={this.props.uiLoader}>
            <CircularProgress color="inherit" />
          </Backdrop>
          {/* <div className="app-div-div">
          </div> */}
          <Notifier />
        </div>
      </BrowserRouter>
    );
  }
};

export default compose(
  connect(
    ({notifications,user,socket,ui}) => ({
      notifications,
      user,
      socket,
      uiLoader: ui.app.uiLoader,
    }),
    dispatch => ({
      setSocket: socket => dispatch(socketAction.setSocket(socket)),
      InitState: () => dispatch(initialAction()),
      notify: (...args) => dispatch(uiAction.notify.enqueueSnackbar(...args)),
      closeNotify: key => dispatch(uiAction.notify.closeSnackbar(key)),
      connected: connected => dispatch(uiAction.app.setConnection({ connected })),
    })
  ),
  withStyles(useStyles)
)(App);