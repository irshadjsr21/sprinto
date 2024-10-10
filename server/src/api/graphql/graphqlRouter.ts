import { ApolloServer, type ApolloServerOptions } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { authorService } from "./authorService";
import { bookService } from "./bookService";
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
    totalAuthors: () => authorService.getTotalCount(),
    totalBooks: () => bookService.getTotalCount(),
  },
  Mutation: {
    addAuthor: async (_, params) => authorService.create(params),
    addBook: async (_, params) => bookService.create(params),
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
