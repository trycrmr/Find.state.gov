import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import Stories from './datastory/Stories';

class DataStory extends Component {
  constructor(props) {
    super(props);
  }

  // this.props will be the extracted datastory object
  componentWillMount() {
    this.props.fetchStoriesIfNeeded();
  }


  render () {
    const { stories, loaded } = this.props;
    return (
      <div>
        {!loaded && stories.length === 0 &&
          <h3>Loading...</h3>
        }
        {loaded && stories.length === 0 &&
          <h3>Empty</h3>
        }
        {stories.length > 0 &&
          <div style={{ opacity: !loaded ? 0.5 : 1 }}>
            <Stories stories={stories} />
          </div>
        }
      </div>
    );
  }
}

DataStory.propTypes = {
  stories: PropTypes.array.isRequired,
  loaded: PropTypes.bool.isRequired
};

export default DataStory;