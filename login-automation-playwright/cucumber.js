module.exports = {
  default: {
    paths: ['features/**/*.feature'],
    require: [
      'features/support/*.js',
      'features/step_definitions/*.js',
    ],
    format: ['progress'],
    publishQuiet: true,
  },
  headed: {
    paths: ['features/**/*.feature'],
    require: [
      'features/support/*.js',
      'features/step_definitions/*.js',
    ],
    format: ['progress'],
    publishQuiet: true,
    worldParameters: {
      headless: false,
    },
  },
};
