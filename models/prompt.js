import { Schema, model, models } from 'mongoose';

const PromptSchema = new Schema({
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  prompt: {
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

const Prompt = models.Prompt || model('Prompt', PromptSchema);

export default Prompt;
