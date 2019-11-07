import mongoose from "mongoose";
import { requiredStringValidator } from "api/validators";
import { PostSchema } from "api/posts/post.model";

const TopicSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Topic name cannot be null"],
    validate: requiredStringValidator
  },
  linkUrl: {
    type: String,
    required: [true, "Topic needs a url"],
    validate: requiredStringValidator
  },
  icon: {
    type: String,
    required: [true, "Topic needs an identifying icon"],
    validate: requiredStringValidator
  },
  posts: [PostSchema]
});

export default mongoose.model("Topic", TopicSchema);
