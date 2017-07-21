import { makeExecutableSchema } from 'graphql-tools';

import resolvers from './resolvers';

// define types in template string
//  Query on different types of data
const typeDefs = `
  type Item {
    id: ID!
    title: String!
    description: String
    imageUrl: String!
    tags: [String]
    itemOwner: User!
    createdOn: Int!
    available: Boolean!
    borrower: User
  }

  type User {
    id: ID!
    email: String!
    fullName: String!
    bio: String
    items: [Item]
    borrowed: [Item]
  }

  type Query {
    items: [Item]
    item(id: ID!): Item
    users: [User]
    user(id: ID!): User
  }
  type Mutation {
    addItem (
      title: String!
      description: String!
      imageUrl: String
      tags: [String]
      itemOwner: ID!
    ): Item
  }
`;

// call typedefs we define up there(typeDefs: typeDefs)
export default makeExecutableSchema({
  typeDefs,
  resolvers
})