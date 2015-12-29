import React, { Component } from 'react';

class Login extends Component {

  login(e) {
    e.preventDefault();
    this.props.fetchUser(this.state.user, this.state.password)
  }

  handleChange(event) {
    event.preventDefault()
    var input = {
      field: event.target.type,
      value: event.target.value
    }
    this.props.userInput(input)
  }

  render() {

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
                <label htmlFor="EmailAddress"><span>*</span> Email Address</label>
                <input value={this.props.email} onChange={this.handleChange.bind(this)} type="email" className="form-control" name="EmailAddress" id="EmailAddress" aria-required="true" aria-invalid="true" required />
              </div>

              <div className="form-group">
                <label htmlFor="EmailAddress"><span>*</span> Password</label>
                <input value={this.props.password} onChange={this.handleChange.bind(this)} type="password" className="form-control" name="password" id="password" aria-required="true" aria-invalid="true" required />
              </div>

              <button onClick={this.login.bind(this)} className="btn btn-lg btn-primary btn-block" type="submit">Login</button>

            </form>
          </div> 
          <h1> or </h1>
          <div className="form-container">

            <form role="form" className="form-signin">
              <h4>Create an Account... (USG Only)</h4>

              <div className="form-group">
                <label htmlFor="EmailAddress"><span>*</span> Email Address</label>
                <input type="email" className="form-control" name="EmailAddress" id="EmailAddress" aria-required="true" aria-invalid="true" required />
              </div>

              <div className="form-group">
                <label htmlFor="Password"><span>*</span> Password</label>
                <input type="password" className="form-control" name="password" id="password" aria-required="true" aria-invalid="true" required />
              </div>

              <div className="form-group">
                <label htmlFor="Name"><span>*</span> First and Last Name</label>
                <input type="text" className="form-control" name="name" id="name" aria-required="true" aria-invalid="true" required />
              </div>

              <button className="btn btn-lg btn-primary btn-block" type="submit">Register</button>

            </form>
          </div> 

        </div>
      </div>
    );
  }
}

export default Login;