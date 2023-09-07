const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  username: {
    type: String,
    required: true,
  },
  timeToCook: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  ingredients: [
    {
      type: String,
      required: true,
    },
  ],
  instructions: [
    {
      type: String,
      required: true,
    },
  ],
});

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;
