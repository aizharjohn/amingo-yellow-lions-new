import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import FeedItem from './FeedItem';
import FeedForm from './FeedForm';
import { getFeeds } from '../../actions/feed';

const Feeds = ({ getFeeds, feed: { feeds, loading } }) => {
  useEffect(() => {
    getFeeds();
  }, [getFeeds]);

  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1 className='large text-primary' style={{ marginTop: '150px' }}>
        Feeds
      </h1>
      <p className='lead'>
        <i className='fas fa-user' /> Welcome to Health Share
      </p>
      <FeedForm />
      <div className='posts'>
        {feeds.map(feed => (
          <FeedItem key={feed._id} feed={feed} />
        ))}
      </div>
    </Fragment>
  );
};

Feeds.propTypes = {
  getFeeds: PropTypes.func.isRequired,
  feed: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  feed: state.feed
});

export default connect(mapStateToProps, { getFeeds })(Feeds);
