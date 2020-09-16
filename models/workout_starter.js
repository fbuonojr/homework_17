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
        },
        name: {
          // For the schema of this attribute, define type and trim and required
        },
        duration: {
          // For the schema of this attribute, define type as number and its required
        },
        weight: {
          // For the schema of this attribute, define type as number
        },
        reps: {
          // For the schema of this attribute, define type as number
        },
        sets: {
          // For the schema of this attribute, define type as number
        },
        distance: {
          // For the schema of this attribute, define type as number
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
