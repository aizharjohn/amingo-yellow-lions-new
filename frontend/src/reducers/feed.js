import {
  GET_FEEDS,
  FEED_ERROR,
  UPDATE_LIKES,
  DELETE_FEED,
  ADD_FEED,
  GET_FEED,
  ADD_COMMENT,
  REMOVE_COMMENT
} from '../actions/types';

const initialState = {
  feeds: [],
  feed: null,
  loading: true,
  error: {}
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_FEEDS:
      return {
        ...state,
        feeds: payload,
        loading: false
      };
    case GET_FEED:
      return {
        ...state,
        feed: payload,
        loading: false
      };
    case ADD_FEED:
      return {
        ...state,
        feeds: [payload, ...state.feeds],
        loading: false
      };
    case DELETE_FEED:
      return {
        ...state,
        feeds: state.feeds.filter(feed => feed._id !== payload),
        loading: false
      };
    case FEED_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      };
    case UPDATE_LIKES:
      return {
        ...state,
        feeds: state.feeds.map(feed =>
          feed._id === payload.id ? { ...feed, likes: payload.likes } : feed
        ),
        loading: false
      };
    case ADD_COMMENT:
      return {
        ...state,
        feed: { ...state.feed, comments: payload },
        loading: false
      };
    case REMOVE_COMMENT:
      return {
        ...state,
        feed: {
          ...state.feed,
          comments: state.feed.comments.filter(
            comment => comment._id !== payload
          )
        },
        loading: false
      };
    default:
      return state;
  }
}
