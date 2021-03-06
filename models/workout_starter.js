const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const workoutSchema = new Schema(
  {
    day: {
      // For the schema of this attribute, define type and default
      type: Date,
      default: () => new Date(),
    },
    exercises: [
      // Schema for each item in exercises array
      {
        type: {
          // For the schema of this attribute, define type and trim and required
          type: String,
          trim: true,
          required: true
        },
        name: {
          // For the schema of this attribute, define type and trim and required
          type: String,
          trim: true,
          required: true
        },
        duration: {
          // For the schema of this attribute, define type as number and its required
          type: Number,
          required: true
        },
        weight: {
          // For the schema of this attribute, define type as number
          type: Number
        },
        reps: {
          // For the schema of this attribute, define type as number
          type: Number
        },
        sets: {
          // For the schema of this attribute, define type as number
          type: Number
        },
        distance: {
          // For the schema of this attribute, define type as number
          type: Number
        },
      },
    ],
  },
  {
    toJSON: {
      // include any virtual properties when data is requested
      virtuals: true,
    },
  }
);

// adds a dynamically-created property to schema
workoutSchema.virtual('totalDuration').get(function () {
  // "reduce" array of exercises down to just the sum of their durations
  return this.exercises.reduce((total, exercise) => {
    return total + exercise.duration;
  }, 0);
});

const Workout = mongoose.model('Workout', workoutSchema);

module.exports = Workout;
