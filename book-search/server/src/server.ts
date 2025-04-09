
import express from 'express';
import path from 'node:path';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import cors from 'cors';
import bodyParser from 'body-parser';
import { getUserFromToken } from './services/auth.js';

import dotenv from 'dotenv';
dotenv.config();

import db from './config/connection.js';
import routes from './routes/index.js';

import { typeDefs, resolvers } from './schemas/index.js';

const app = express();
const PORT = process.env.PORT || 3001;

const startApolloServer = async () => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  await server.start();

  app.use(
    '/graphql',
    cors(),
    bodyParser.json(),
    expressMiddleware(server, {
      context: async ({ req }) => {
        const user = getUserFromToken(req);
        return { user };
      },
    })
  );

  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/dist')));
  }

  app.use(routes); // still use REST routes if needed during transition

  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`Now listening on localhost:${PORT}`);
      console.log(`GraphQL available at http://localhost:${PORT}/graphql`);
    });
  });
};

startApolloServer();
