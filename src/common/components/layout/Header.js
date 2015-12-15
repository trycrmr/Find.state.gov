import React, { Component, PropTypes } from 'react';

class Header extends Component {

  render() {

    return (
      	<div className="masthead">
			<div className="container">
			  <h3 className="masthead-title">
			    <a href="/" title="Home">Find State Gov Componenets</a>
			    <small>Click on menu icon to get started</small>
			  </h3>
			</div>
		</div>
    );
  }
}

// Header.propTypes = {
//   counter: PropTypes.number.isRequired,
//   todos: PropTypes.array.isRequired
// };

export default Header;