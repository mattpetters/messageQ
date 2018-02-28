module.exports = {
  require: jest.genMockFunction(),
  match: jest.genMockFunction(),
  app: { on: jest.genMockFunction()},
  remote: jest.genMockFunction(),
  dialog: jest.genMockFunction()
};
