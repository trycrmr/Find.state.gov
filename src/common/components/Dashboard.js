import React, { PropTypes, Component } from 'react';

class Dashboard extends Component {

  constructor(props, context) {
     super(props);
     console.log(context) //=> not undefined
  }

  componentWillMount() {
    // we need to look for JWT token before continuing with the user view
    // if token in storage, fetch data if needed
    // if no token, take user to login screen
    let jwt = localStorage.getItem('jwt');
    if (!jwt) {
      this.props.history.pushState(null, '/auth')
    }
    //let unauthorized = !this.props.user && !jwt;

    // automatically authenticates the user if a JWT is found
    // if (jwt) {
    //   this.props.autoLoginUser(jwt);
    // } else {
    //   this.context.router.transitionTo('/login');
    // }

  }    

  render() {
    //this.context.router.transitionTo('auth');
      // we show a loading screen initally, and based on if the current user is updated or not, we either show the contents intended to be rendered, or redirec the client to the login page.
      return <h1>Admin Dashboard</h1>
      // if (user) {
      //   return <ComponentToBeRendered {...this.props} currentUser={user} />;
      // } else {
      //   return <Spinner fullScreen={true} />;
      // }

  }
}

Dashboard.contextTypes = {
  router: React.PropTypes.func
};

export default Dashboard;