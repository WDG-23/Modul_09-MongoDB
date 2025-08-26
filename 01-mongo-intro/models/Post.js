import { Schema, model } from 'mongoose';

const postSchema = new Schema({
  title: {
    type: String,
    requred: true,
  },
  content: {
    type: String,
    required: true,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'user',
  },
});

const Post = model('post', postSchema);

export default Post;
