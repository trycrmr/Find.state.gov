import React, { PropTypes, Component } from 'react';

export default class Stories extends Component {
  render () {
    return (
      <div>
        {this.props.stories.map((story, i) =>
          <span key={i}>
            <h3>{story.title}</h3>
            <p>{story.content}</p>
          </span>
        )}
      </div>
    );
  }
}

Stories.propTypes = {
  stories: PropTypes.array.isRequired
};