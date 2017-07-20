import { makeExecutableSchema } from 'graphql-tools';

import resolvers from './resolvers';

// define types in template string
//  Query on different types of data
const typeDefs = `

  type Item {
    id: ID!
    title: String!
    description: String
    imageUrl: String
    tags: []
    itemOwner: User
    createdOn: Int
    available: Boolean
    borrower: String
  }

  type User {
    id: ID!
    email: String
    fullName: String!
    bio: String
  }

  type Query {
    items: [Item]
    items(id: ID!): Item
    users: [User]
    users(id: ID!): User
  }
`;

// call typedefs we define up there(typeDefs: typeDefs)
export default makeExecutableSchema({
  typeDefs,
  resolvers
})