const { ApolloServer } = require('apollo-server-lambda');
import { typeDefs, resolvers } from './src';

const server = new ApolloServer({ typeDefs, resolvers });

exports.graphqlHandler = (event, lambdaContext, callback) => {
  // Playground handler
  if (event.httpMethod === 'GET') {
    server.createHandler()(
      { ...event, path: event.requestContext.path || event.path },
      lambdaContext,
      callback
    );
  } else {
    server.createHandler()(event, lambdaContext, callback);
  }
};
