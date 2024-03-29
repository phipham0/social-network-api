const { Schema, Types } = require('mongoose');

// Schema to create a Reaction subdoc
const reactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    reactionBody: {
      type: String,
      required: true,
      maxLength: 280
    },
    userName: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (date) => {
        if (date) return date.toDateString();
      }
    },

  },
  {
    toJSON: {
      getters: true
    },
    id: false,
  }
);

module.exports = reactionSchema;
