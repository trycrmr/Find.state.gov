import React, { PropTypes, Component } from 'react';

export default class Stories extends Component {
  render () {
    return (
      
      <div class="row data-story-set">
        {this.props.stories.map((story, i) =>
            <div key={i} className="col-md-4 data-story-box">
              <div className="col-md-12 data-story">
                <h4 className="data-story-title">{story.title}</h4><hr/>
                <p className="data-story-text">{story.content}</p>
              </div>
            </div>
        )}
      </div>
    );
  }
}

Stories.propTypes = {
  stories: PropTypes.array.isRequired
};