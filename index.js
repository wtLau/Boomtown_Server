import express from 'express';
import bodyParser from 'body-parser';
import {
    graphqlExpress,
    graphiqlExpress
} from 'graphql-server-express';
import cors from 'cors';
import schema from './api/schema';
import createLoaders from './api/loaders'

const GQL_PORT = 4000;
const app = express();

app.use('*', cors());

app.use('/graphql', bodyParser.json(), graphqlExpress({ 
  schema,
  //any additional request to pass into resolver, has to be object
  context: {
    loaders: createLoaders()
  }
}));

app.use('/graphiql', graphiqlExpress({
    endpointURL: '/graphql'
}));

app.listen(GQL_PORT, () => console.log(
    `GraphQL is now running on localhost:${GQL_PORT}/graphql`
));