import { ApolloServer, type ApolloServerOptions } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { authorService } from "./authorService";
import { bookService } from "./bookService";
import { reviewService } from "./reviewService";
import typeDefs from "./schema.graphql";

const resolvers: ApolloServerOptions<any>["resolvers"] = {
  Query: {
    authors: async (_, params, __, info) => {
      const allFields = info.operation.selectionSet.selections
        .filter((s) => (s as any).name.value === "authors")
        .flatMap((s) => (s as any).selectionSet?.selections?.map((a: any) => a?.name?.value));

      return authorService.findAll({
        ...params,
        includeBooks: allFields.includes("books"),
      });
    },
    books: async (_, params, __, info) => {
      const allFields = info.operation.selectionSet.selections
        .filter((s) => (s as any).name.value === "books")
        .flatMap((s) => (s as any).selectionSet?.selections?.map((a: any) => a?.name?.value));

      return bookService.findAll({
        ...params,
        includeAuthor: allFields.includes("author"),
      });
    },
    reviews: async (_, params) => {
      return reviewService.findAll(params);
    },
    totalAuthors: (_, params) => authorService.getTotalCount(params),
    totalBooks: (_, params) => bookService.getTotalCount(params),
    totalReviews: (_, params) => reviewService.getTotalCount(params.bookId),
  },
  Mutation: {
    addAuthor: async (_, params) => authorService.create(params),
    addBook: async (_, params) => bookService.create(params),
    addReview: async (_, params) => reviewService.create(params),
    deleteAuthor: async (_, params) => authorService.delete(params.id),
    deleteBook: async (_, params) => bookService.delete(params.id),
    deleteReview: async (_, params) => reviewService.delete(params.id),
    updateAuthor: async (_, { id, ...params }) => authorService.update(id, params),
    updateBook: async (_, { id, ...params }) => bookService.update(id, params),
    updateReview: async (_, { id, ...params }) => reviewService.update(id, params),
  },
  Book: {
    rating: (book) => reviewService.getBookRating(book.id),
  },
  Review: {
    createdAt: (review) => review.createdAt.getTime().toString(),
    updatedAt: (review) => review.updatedAt.getTime().toString(),
  },
  Author: {
    totalBooks: (author) => bookService.getTotalCount({ authorId: author.id }),
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

export const getGraphqlRouter = async () => {
  await server.start();
  return expressMiddleware(server);
};
