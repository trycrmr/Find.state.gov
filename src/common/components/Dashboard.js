import React, { Component } from 'react';

class Dashboard extends Component {

    componentDidMount() {
      // returns out of method is current user already exists
      if (this.props.user) return;

      let jwt = localStorage.getItem('jwt');
      let unauthorized = !this.props.user && !jwt;

      // automatically authenticates the user if a JWT is found
      if (jwt) this.props.autoLoginUser(jwt);

      // redirect to login page is theres no current user state or any JWT
      if (unauthorized) this.context.router.transitionTo('/login');
    }

    componentWillUnmount() {
      this._unsubscribe();
    }
    

  render() {

    const { user } = this.props.user;
      
      // we show a loading screen initally, and based on if the current user is updated or not, we either show the contents intended to be rendered, or redirec the client to the login page.

      if (user) {
        return <ComponentToBeRendered {...this.props} currentUser={user} />;
      } else {
        return <Spinner fullScreen={true} />;
      }

  }
}

Dashboard.contextTypes = {
  router: React.PropTypes.func
};

export default Dashboard;