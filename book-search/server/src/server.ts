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
// import routes from './routes/index';

import { typeDefs, resolvers } from './schemas/index.js';

import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

const startApolloServer = async () => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  await server.start();

  await db();

  app.use(cors({
    origin: [
      'http://localhost:3000',
      'https://bookit-book-search-1.onrender.com',
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  }));
  
  app.use(
    '/graphql',
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

  // app.use(routes); // still use REST routes if needed during transition

    app.listen(PORT, () => {
      console.log(`Server is now listening on http://localhost:${PORT}`);
      console.log(`GraphQL endpoint at http://localhost:${PORT}/graphql`);
    });

};

startApolloServer();
