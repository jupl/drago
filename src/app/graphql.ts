import {GraphQLOptions} from 'apollo-server-core'
import * as merge from 'deepmerge'
import {IResolvers, makeExecutableSchema} from 'graphql-tools'
import {Request} from 'hapi'
import * as CommonGQL from '../common/graphql'

/** Context for resolvers */
export type Context = CommonGQL.Context

/** Options for creating GQL instance */
// tslint:disable:no-empty-interface
export interface Options {}

/**
 * Create GraphQL options creator
 * @return GraphQL options handler
 */
export function createOptionsFactory({}: Options) {
  const gqlOptions: GraphQLOptions<Context> = {
    context: {},
    rootValue: {},
    schema: makeExecutableSchema({
      typeDefs: [
        CommonGQL.typeDefs,
      ],
      resolvers: merge.all<IResolvers>([
        CommonGQL.resolvers(),
      ]),
    }),
  }
  return function createOptions(_: Request): GraphQLOptions<Context> {
    return gqlOptions
  }
}
