import React from 'react';
import { Redirect, Route } from 'react-router-dom';



class PrivateRoute extends React.Component {

  
  render() {
    const { component: Component, ...rest } = this.props;

    window.prevLocation = this.props.location;

    return (
      <Route
        {...rest}
        render={(props) => {
          if (localStorage.getItem('token')) {
            if (props.location.pathname === '/') {
              return <Redirect to="/" />;
            } else {
              return <Component {...props} />;
            }
          } else {
            return <Redirect to="/sign-in" />;
          }
        }}
      />
    );
  }
}

export default PrivateRoute;
