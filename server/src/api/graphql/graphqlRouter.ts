import { ApolloServer, type ApolloServerOptions } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { authorService } from "./authorService";
import { bookService } from "./bookService";

const typeDefs = `#graphql
  type Author {
    id: String,
    name: String,
    biography: String
    bornDate: String
    books: [Book]
    createdAt: String
    updatedAt: String
  }

  type Book {
    id: String,
    title: String
    description: String
    publishedDate: String
    authorId: String
    author: Author
    createdAt: String
    updatedAt: String
  }

  type Query {
    authors(page: Int, pageSize: Int, id: String): [Author]
    books(page: Int, pageSize: Int, id: String): [Book]
  }

  type Mutation {
    addAuthor(name: String, biography: String, bornDate: String): Author
    addBook(title: String, description: String, publishedDate: String, authorId: String): Book
  }
`;

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
