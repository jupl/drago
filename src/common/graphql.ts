import {IResolvers} from 'graphql-tools'

/** Context for resolvers */
// tslint:disable:no-empty-interface
export interface Context {}

/** Schema definition */
export const typeDefs = `
  schema {
    mutation: Mutation
    query: Query
  }

  type Mutation {
    _: Boolean
  }

  type Query {
    _: Boolean
  }
`

/**
 * Generate resolvers
 * @return Resolvers
 */
export function resolvers(): IResolvers<{}, Context> {
  return {}
}
