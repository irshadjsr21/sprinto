/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
const documents = {
    "\n  query GetAuthors($page: Int, $pageSize: Int) {\n    authors(page: $page, pageSize: $pageSize) {\n      id\n      name\n      bornDate\n    }\n    totalAuthors\n  }\n": types.GetAuthorsDocument,
    "\n  mutation AddAuthor($name: String!, $biography: String, $bornDate: String) {\n    addAuthor(name: $name, biography: $biography, bornDate: $bornDate) {\n      id\n      name\n      bornDate\n    }\n  }\n": types.AddAuthorDocument,
    "\n  query GetBooks($page: Int, $pageSize: Int) {\n    books(page: $page, pageSize: $pageSize) {\n      id\n      title\n      description\n      publishedDate\n      author {\n        id\n        name\n      }\n    }\n    totalBooks\n  }\n": types.GetBooksDocument,
    "\n  mutation AddBook($title: String!, $description: String, $publishedDate: String, $authorId: String) {\n    addBook(title: $title, description: $description, publishedDate: $publishedDate, authorId: $authorId) {\n      id\n      title\n      description\n      publishedDate\n    }\n  }\n": types.AddBookDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetAuthors($page: Int, $pageSize: Int) {\n    authors(page: $page, pageSize: $pageSize) {\n      id\n      name\n      bornDate\n    }\n    totalAuthors\n  }\n"): (typeof documents)["\n  query GetAuthors($page: Int, $pageSize: Int) {\n    authors(page: $page, pageSize: $pageSize) {\n      id\n      name\n      bornDate\n    }\n    totalAuthors\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation AddAuthor($name: String!, $biography: String, $bornDate: String) {\n    addAuthor(name: $name, biography: $biography, bornDate: $bornDate) {\n      id\n      name\n      bornDate\n    }\n  }\n"): (typeof documents)["\n  mutation AddAuthor($name: String!, $biography: String, $bornDate: String) {\n    addAuthor(name: $name, biography: $biography, bornDate: $bornDate) {\n      id\n      name\n      bornDate\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetBooks($page: Int, $pageSize: Int) {\n    books(page: $page, pageSize: $pageSize) {\n      id\n      title\n      description\n      publishedDate\n      author {\n        id\n        name\n      }\n    }\n    totalBooks\n  }\n"): (typeof documents)["\n  query GetBooks($page: Int, $pageSize: Int) {\n    books(page: $page, pageSize: $pageSize) {\n      id\n      title\n      description\n      publishedDate\n      author {\n        id\n        name\n      }\n    }\n    totalBooks\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation AddBook($title: String!, $description: String, $publishedDate: String, $authorId: String) {\n    addBook(title: $title, description: $description, publishedDate: $publishedDate, authorId: $authorId) {\n      id\n      title\n      description\n      publishedDate\n    }\n  }\n"): (typeof documents)["\n  mutation AddBook($title: String!, $description: String, $publishedDate: String, $authorId: String) {\n    addBook(title: $title, description: $description, publishedDate: $publishedDate, authorId: $authorId) {\n      id\n      title\n      description\n      publishedDate\n    }\n  }\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;