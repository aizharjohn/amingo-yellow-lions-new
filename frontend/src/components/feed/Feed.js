import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import FeedItem from '../feeds/FeedItem';
import CommentForm from './CommentForm';
import CommentItem from './CommentItem';
import { getFeed } from '../../actions/feed';

const Feed = ({ getFeed, feed: { feed, loading }, match }) => {
  useEffect(() => {
    getFeed(match.params.id);
  }, [getFeed, match.params.id]);

  return loading || feed === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <Link to='/feeds' className='btn'>
        Back To Feeds
      </Link>
      <FeedItem feed={feed} showActions={false} />
      <CommentForm feedId={feed._id} />
      <div className='comments'>
        {feed.comments.map(comment => (
          <CommentItem key={comment._id} comment={comment} feedId={feed._id} />
        ))}
      </div>
    </Fragment>
  );
};

Feed.propTypes = {
  getFeed: PropTypes.func.isRequired,
  feed: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  feed: state.feed
});

export default connect(mapStateToProps, { getFeed })(Feed);
