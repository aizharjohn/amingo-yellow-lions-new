import axios from 'axios';
import { setAlert } from './alert';
import {
  GET_FEEDS,
  FEED_ERROR,
  UPDATE_LIKES,
  DELETE_FEED,
  ADD_FEED,
  GET_FEED,
  ADD_COMMENT,
  REMOVE_COMMENT
} from './types';

// Get feeds
export const getFeeds = () => async dispatch => {
  try {
    const res = await axios.get('http://localhost:5000/api/feeds');

    dispatch({
      type: GET_FEEDS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: FEED_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Add like
export const addLike = id => async dispatch => {
  try {
    const res = await axios.put(`http://localhost:5000/api/feeds/like/${id}`);

    dispatch({
      type: UPDATE_LIKES,
      payload: { id, likes: res.data }
    });
  } catch (err) {
    dispatch({
      type: FEED_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Remove like
export const removeLike = id => async dispatch => {
  try {
    const res = await axios.put(`http://localhost:5000/api/feeds/unlike/${id}`);

    dispatch({
      type: UPDATE_LIKES,
      payload: { id, likes: res.data }
    });
  } catch (err) {
    dispatch({
      type: FEED_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Delete feed
export const deleteFeed = id => async dispatch => {
  try {
    await axios.delete(`http://localhost:5000/api/feeds/${id}`);

    dispatch({
      type: DELETE_FEED,
      payload: id
    });

    dispatch(setAlert('Feed Removed', 'success'));
  } catch (err) {
    dispatch({
      type: FEED_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Add feed
export const addFeed = formData => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  try {
    const res = await axios.post(
      'http://localhost:5000/api/feeds',
      formData,
      config
    );

    dispatch({
      type: ADD_FEED,
      payload: res.data
    });

    dispatch(setAlert('Feed Created', 'success'));
  } catch (err) {
    dispatch({
      type: FEED_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Get feed
export const getFeed = id => async dispatch => {
  try {
    const res = await axios.get(`http://localhost:5000/api/feeds${id}`);

    dispatch({
      type: GET_FEED,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: FEED_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Add comment
export const addComment = (feedId, formData) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  try {
    const res = await axios.post(
      `http://localhost:5000/api/feeds/comment/${feedId}`,
      formData,
      config
    );

    dispatch({
      type: ADD_COMMENT,
      payload: res.data
    });

    dispatch(setAlert('Comment Added', 'success'));
  } catch (err) {
    dispatch({
      type: FEED_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Delete comment
export const deleteComment = (feedId, commentId) => async dispatch => {
  try {
    await axios.delete(
      `http://localhost:5000/api/feeds/comment/${feedId}/${commentId}`
    );

    dispatch({
      type: REMOVE_COMMENT,
      payload: commentId
    });

    dispatch(setAlert('Comment Removed', 'success'));
  } catch (err) {
    dispatch({
      type: FEED_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
