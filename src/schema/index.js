const { gql } = require('apollo-server-lambda');
const {
  fetchDepartures,
  fetchDirections,
  fetchRoutes,
  fetchStops,
} = require('../services');

exports.typeDefs = gql`
  type Departure {
    actual: Boolean # Actual
    blockNumber: Int # BlockNumber
    departureText: String # DepartureText
    departureTime: String # DepartureTime
    description: String # Description
    gate: String # Gate
    route: String # Route
    routeDirection: String # RouteDirection
    terminal: String # Terminal
    vehicleHeading: Int # VehicleHeading
    vehicleLatitude: Int # VehicleLatitude
    vehicleLongitude: Int # VehicleLongitude
  }

  type Direction {
    description: String # Text
    id: String # Value
    stops: [Stop]
  }

  type Route {
    description: String # Description
    providerId: String # ProviderID
    route: Int # Route
    directions: [Direction]
  }

  type Stop {
    description: String # Text
    id: String # Value
    departures: [Departure]
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
  Departure: {
    actual: (parent) => parent.Actual,
    blockNumber: (parent) => parent.BlockNumber,
    departureText: (parent) => parent.DepartureText,
    departureTime: (parent) => parent.DepartureTime,
    description: (parent) => parent.Description,
    gate: (parent) => parent.Gate,
    route: (parent) => parent.Route,
    routeDirection: (parent) => parent.RouteDirection,
    terminal: (parent) => parent.Terminal,
    vehicleHeading: (parent) => parent.VehicleHeading,
    vehicleLatitude: (parent) => parent.VehicleLatitude,
    vehicleLongitude: (parent) => parent.VehicleLongitude,
  },
  Direction: {
    description: (parent) => parent.Text,
    id: (parent) => parent.Value,
    stops: (parent) =>
      fetchStops(parent.route, parent.Value).then((stops) =>
        stops.map((stop) => ({
          ...stop,
          route: parent.route,
          direction: parent.Value,
        }))
      ),
  },
  Route: {
    description: (parent) => parent.Description,
    providerId: (parent) => parent.ProviderID,
    route: (parent) => parent.Route,
    directions: (parent) =>
      fetchDirections(parent.Route).then((directions) =>
        directions.map((direction) => ({ ...direction, route: parent.Route }))
      ),
  },
  Stop: {
    description: (parent) => parent.Text,
    id: (parent) => parent.Value,
    departures: (parent) =>
      fetchDepartures(parent.route, parent.direction, parent.Value),
  },
};
