const { gql } = require('apollo-server-lambda');
const { fetchRoutes } = require('../services');

// Construct a schema, using GraphQL schema language
exports.typeDefs = gql`
  type Route {
    description: String # Description
    providerId: String # ProviderID
    routeNumber: Int # Route
  }

  type Query {
    routes: [Route]
  }
`;

// Provide resolver functions for your schema fields
exports.resolvers = {
  Query: {
    routes: fetchRoutes,
  },
  Route: {
    description: (parent) => parent.Description,
    providerId: (parent) => parent.ProviderID,
    routeNumber: (parent) => parent.Route,
  },
};
