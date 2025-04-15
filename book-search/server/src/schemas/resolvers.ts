import User from '../models/User.js';
import { signToken } from '../services/auth.js';
import { AuthenticationError } from 'apollo-server-express';
type Resolvers = {
  Query: {
    me: (_parent: any, _args: any, context: any) => Promise<any>;
  };
  Mutation: {
    login: (_parent: any, args: { email: string; password: string }) => Promise<any>;
    addUser: (_parent: any, args: { username: string; email: string; password: string }) => Promise<any>;
    saveBook: (_parent: any, args: { bookData: any }, context: any) => Promise<any>;
    removeBook: (_parent: any, args: { bookId: string }, context: any) => Promise<any>;
  };
};

export const resolvers: Resolvers = {
  Query: {
    me: async (_parent, _args, context) => {
      if (context.user) {
        const foundUser = await User.findById(context.user._id).populate('savedBooks');
        return foundUser;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
  },

  Mutation: {
    login: async (_parent, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const correctPw = await user.isCorrectPassword(password);
      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken({
        username: user.username,
        email: user.email,
        _id: user._id.toString(),
      });
      
      return { token, user };
    },

    addUser: async (_parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken({
        username: user.username,
        email: user.email,
        _id: user._id.toString(),
      });
      
      return { token, user };
    },

    saveBook: async (_parent, { bookData }, context) => {
      if (context.user) {
        const updatedUser = await User.findByIdAndUpdate(
          context.user._id,
          { $addToSet: { savedBooks: bookData } },
          { new: true, runValidators: true }
        );
        return updatedUser;
      }
      throw new AuthenticationError('You need to be logged in!');
    },

    removeBook: async (_parent, { bookId }, context) => {
      if (context.user) {
        const updatedUser = await User.findByIdAndUpdate(
          context.user._id,
          { $pull: { savedBooks: { bookId } } },
          { new: true }
        );
        return updatedUser;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
  },
};
