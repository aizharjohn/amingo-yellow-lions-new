const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const FeedSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  topic: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  },
  username: {
    type: String
  },
  avatar: {
    type: String
  },
  likes: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'user'
      }
    }
  ],
  comments: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'user'
      },
      text: {
        type: String,
        required: true
      },
      username: {
        type: String
      },
      avatar: {
        type: String
      },
      date: {
        type: Date,
        default: Date.now
      }
    }
  ],
  hashtags: {
    type: [String]
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const Feed = mongoose.model('feed', FeedSchema);
module.exports = Feed;
