import React, { Component } from 'react';

class Login extends Component {

  // React initial method
  componentWillMount() {
    // Create a local state for forms
    this.setState({
      email: '',
      password: '',
      reg_email: '',
      reg_pass: '',
      reg_name: ''
    });
  }

  // handles form input changes and local state
  handleChange(event) {
    switch(event.target.name) {
      case 'email':
        this.setState({email: event.target.value});
        break;
      case 'password':
        this.setState({password: event.target.value})
        break;
      case 'reg_email':
        this.setState({reg_email: event.target.value})
        break;
      case 'reg_pass':
        this.setState({reg_pass: event.target.value})
        break;
      case 'reg_name':
        this.setState({reg_name: event.target.value})
        break;
      default:      
    }
  }

  login(e) {
    e.preventDefault();
    // methods will extract parts they need from this local 
    // state and to put into the global state
    this.props.LoginUser(this.state)
  }

  register(e) {
    // TODO:
    // this.props.RegisterUser(this.state)
  }

  render() {

    const { 
      email, password,
      reg_email, reg_pass, reg_name
    } = this.state

    return (
      <div className="container">
          
        <header>
          <h1>Welcome to Find</h1>
        </header>

        <div className="content">

          <div className="form-container">

            <form role="form" className="form-signin">
              <h4>Please login... (USG Only)</h4>

              <div className="form-group">
                <label htmlFor="email"><span>*</span> Email Address</label>
                <input value={email} onChange={this.handleChange.bind(this)} placeholder="Email" type="email" className="form-control" name="email" id="EmailAddress" aria-required="true" aria-invalid="true" required />
              </div>

              <div className="form-group">
                <label htmlFor="password"><span>*</span> Password</label>
                <input value={password}  onChange={this.handleChange.bind(this)} placeholder="Password" type="password" className="form-control" name="password" id="password" aria-required="true" aria-invalid="true" required />
              </div>

              <button  onClick={this.login.bind(this)} className="btn btn-lg btn-primary btn-block" type="submit">Login</button>

            </form>
          </div> 
          <h1> or </h1>
          <div className="form-container">

            <form role="form" className="form-signin">
              <h4>Create an Account... (USG Only)</h4>

              <div className="form-group">
                <label htmlFor="reg_email"><span>*</span> Email Address</label>
                <input value={reg_email} onChange={this.handleChange.bind(this)} type="email" className="form-control" name="reg_email" id="EmailAddress" aria-required="true" aria-invalid="true" required />
              </div>

              <div className="form-group">
                <label htmlFor="reg_pass"><span>*</span> Password</label>
                <input value={reg_pass} onChange={this.handleChange.bind(this)} type="password" className="form-control" name="reg_pass" id="password" aria-required="true" aria-invalid="true" required />
              </div>

              <div className="form-group">
                <label htmlFor="reg_name"><span>*</span> First and Last Name</label>
                <input value={reg_name} onChange={this.handleChange.bind(this)} type="text" className="form-control" name="reg_name" id="name" aria-required="true" aria-invalid="true" required />
              </div>

              <button onClick={this.login.bind(this)} className="btn btn-lg btn-primary btn-block" type="submit">Register</button>

            </form>
          </div> 

        </div>
      </div>
    );

  }
}

export default Login;