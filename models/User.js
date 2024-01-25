const { Schema, Types } = require('mongoose');

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, 'Please use a real email address'],
    },
    thoughts: [{ 
      type: Schema.Types.ObjectId,
      ref: 'thought'
    }],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

postSchema.virtual('thoughtCount').get(function () {
  return this.thoughts.length;
});

const User = model('user', postSchema);

module.exports = assignmentSchema;
