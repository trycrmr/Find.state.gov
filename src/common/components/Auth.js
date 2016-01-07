import React, { Component } from 'react'
import validator from 'validator'

class Auth extends Component {

  componentWillMount() {
    // Decide if user is logged in already
    this.props.loginUserProcess()
  }

  componentDidMount() {
    // Create a local state for forms
    this.setState({
      email: '',
      pass: '',
      reg_email: '',
      reg_pass: '',
      reg_name: '',
      failed: 'none'
    });
  }

  // handles form input changes and local state
  handleChange(event) {
    switch(event.target.name) {
      case 'email':
        this.setState({email: event.target.value});
        break;
      case 'pass':
        this.setState({pass: event.target.value})
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
    var { email, pass} = this.state
    
    function len(inp) {
      return validator.isLength(inp, 2, 55);
    }

    if ( len(email), len(pass) ) {
      email = validator.normalizeEmail(email);
      if ( email != false ) {
        email = validator.escape(email)
        pass = validator.escape(pass)

        var sanatized = {
          email: email,
          pass: pass
        } 
        // all checks passed
        this.props.loginUserSubmit(sanatized)
      } 
      else {
        this.setState({
          failed: 'Email Format not correct'
        })
      }
    } 
    else {
      this.setState({
        failed: 'must only enter 2-55 characters'
      })
    }  
  }

  register(e) {
    e.preventDefault();

    var { reg_email, reg_pass, reg_name } = this.state

    function len(inp) {
      return validator.isLength(inp, 2, 55);
    }
    
    if ( len(reg_email), len(reg_pass), len(reg_name) ) {
      reg_email = validator.normalizeEmail(reg_email);
      if ( reg_email != false ) {
        reg_email = validator.escape(reg_email)
        reg_pass = validator.escape(reg_pass)
        reg_name = validator.escape(reg_name)

        var sanatized = {
          reg_email: reg_email,
          reg_pass: reg_pass,
          reg_name: reg_name
        } 
        // all checks passed
        this.props.registerUserSubmit(sanatized)
      } 
      else {
        this.setState({
          failed: 'email'
        })
      }
    } 
    else {
      this.setState({
        failed: 'must only enter 2-55 characters'
      })
    }  
  }

  render() {

    const { 
      email, pass,
      reg_email, reg_pass, reg_name
    } = this.state
    const {
      loggedIn, validating,
      invalidMsg, user } = this.props

    validating ? return <h3>Validating</h3> :
    loggedIn ? return <h3>Already Logged In </h3> :

    return (
      <div className="container">
          
        <header>
          <h1>Welcome to Find</h1>
        </header>
        {this.state.failed === 'none' ? null : <h2> Input Failed: {this.state.failed} </h2>}

        <div className="content">

          <div className="form-container">

            <form role="form" className="form-signin">
              <h4>Please login... (USG Only)</h4>

              <div className="form-group">
                <label htmlFor="email"><span>*</span> Email Address</label>
                <input value={email} onChange={this.handleChange.bind(this)} placeholder="Email" type="email" className="form-control" name="email" id="EmailAddress" aria-required="true" aria-invalid="true" required />
              </div>

              <div className="form-group">
                <label htmlFor="pass"><span>*</span> Password</label>
                <input value={pass}  onChange={this.handleChange.bind(this)} placeholder="Password" type="password" className="form-control" name="pass" id="password" aria-required="true" aria-invalid="true" required />
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

              <button onClick={this.register.bind(this)} className="btn btn-lg btn-primary btn-block" type="submit">Register</button>

            </form>
          </div> 

        </div>
      </div>
    );

  }
}

export default Auth;