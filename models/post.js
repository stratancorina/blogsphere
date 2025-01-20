import { Schema, model, models } from 'mongoose';

const PostSchema = new Schema({
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  post: {
    type: String,
    required: [true, 'Text is required.'],
  },
  tag: {
    type: String,
    required: [true, 'Tag is required.'],
  },
  title: {
    type: String,
    required: [true, 'Title is required.'],
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Post = models.Post || model('Post', PostSchema);

export default Post;
