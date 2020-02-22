const mongoose = require('mongoose');

const Schema = mongoose.Schema; //so we do not need to keep writing mongoose.schema

const TopicSchema = new Schema({
  topic: {
    type: String,
    required: true
  }
});

const Topic = mongoose.model('topic', TopicSchema);
module.exports = Topic;
