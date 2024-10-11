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
    "\n  query GetAuthors($page: Int, $pageSize: Int, $name: String, $fromBornDate: String, $toBornDate: String) {\n    authors(page: $page, pageSize: $pageSize, name: $name, fromBornDate: $fromBornDate, toBornDate: $toBornDate) {\n      id\n      name\n      bornDate\n    }\n    totalAuthors(name: $name, fromBornDate: $fromBornDate, toBornDate: $toBornDate)\n  }\n": types.GetAuthorsDocument,
    "\n  mutation AddAuthor($name: String!, $biography: String, $bornDate: String) {\n    addAuthor(name: $name, biography: $biography, bornDate: $bornDate) {\n      id\n    }\n  }\n": types.AddAuthorDocument,
    "\n  mutation UpdateAuthor($id: String!, $name: String, $biography: String, $bornDate: String) {\n    updateAuthor(id: $id, name: $name, biography: $biography, bornDate: $bornDate) {\n      id\n    }\n  }\n": types.UpdateAuthorDocument,
    "\n  mutation DeleteAuthor($id: String!) {\n    deleteAuthor(id: $id) \n  }\n": types.DeleteAuthorDocument,
    "\n  query GetAuthor($id: String!) {\n    authors(id: $id) {\n      id\n      name\n      biography\n      bornDate\n    }\n  }\n": types.GetAuthorDocument,
    "\n  query GetBooks($page: Int, $pageSize: Int, $authorId: String, $title: String, $fromPublishedDate: String, $toPublishedDate: String) {\n    books(page: $page, pageSize: $pageSize, authorId: $authorId, title: $title, fromPublishedDate: $fromPublishedDate, toPublishedDate: $toPublishedDate) {\n      id\n      title\n      description\n      publishedDate\n      author {\n        id\n        name\n      }\n    }\n    totalBooks(authorId: $authorId, title: $title, fromPublishedDate: $fromPublishedDate, toPublishedDate: $toPublishedDate)\n  }\n": types.GetBooksDocument,
    "\n  mutation AddBook($title: String!, $description: String, $publishedDate: String, $authorId: String) {\n    addBook(title: $title, description: $description, publishedDate: $publishedDate, authorId: $authorId) {\n      id\n    }\n  }\n": types.AddBookDocument,
    "\n  mutation UpdateBook($id: String!, $title: String, $description: String, $publishedDate: String, $authorId: String) {\n    updateBook(id: $id, title: $title, description: $description, publishedDate: $publishedDate, authorId: $authorId) {\n      id\n    }\n  }\n": types.UpdateBookDocument,
    "\n  mutation DeleteBook($id: String!) {\n    deleteBook(id: $id)\n  }\n": types.DeleteBookDocument,
    "\n  query GetBook($id: String!) {\n    books(id: $id) {\n      id\n      title\n      description\n      publishedDate\n      authorId\n      rating\n      author {\n        id\n        name\n        biography\n        bornDate\n      }\n    }\n  }\n": types.GetBookDocument,
    "\n  query GetReviews($page: Int, $pageSize: Int, $bookId: String!) {\n    reviews(bookId: $bookId, page: $page, pageSize: $pageSize) {\n      id\n      comment\n      rating\n      createdAt\n    }\n    totalReviews(bookId: $bookId)\n  }\n": types.GetReviewsDocument,
    "\n  mutation AddReview($bookId: String!, $comment: String!, $rating: Int!) {\n    addReview(bookId: $bookId, comment: $comment, rating: $rating) {\n      id\n    }\n  }\n": types.AddReviewDocument,
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
export function gql(source: "\n  query GetAuthors($page: Int, $pageSize: Int, $name: String, $fromBornDate: String, $toBornDate: String) {\n    authors(page: $page, pageSize: $pageSize, name: $name, fromBornDate: $fromBornDate, toBornDate: $toBornDate) {\n      id\n      name\n      bornDate\n    }\n    totalAuthors(name: $name, fromBornDate: $fromBornDate, toBornDate: $toBornDate)\n  }\n"): (typeof documents)["\n  query GetAuthors($page: Int, $pageSize: Int, $name: String, $fromBornDate: String, $toBornDate: String) {\n    authors(page: $page, pageSize: $pageSize, name: $name, fromBornDate: $fromBornDate, toBornDate: $toBornDate) {\n      id\n      name\n      bornDate\n    }\n    totalAuthors(name: $name, fromBornDate: $fromBornDate, toBornDate: $toBornDate)\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation AddAuthor($name: String!, $biography: String, $bornDate: String) {\n    addAuthor(name: $name, biography: $biography, bornDate: $bornDate) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation AddAuthor($name: String!, $biography: String, $bornDate: String) {\n    addAuthor(name: $name, biography: $biography, bornDate: $bornDate) {\n      id\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation UpdateAuthor($id: String!, $name: String, $biography: String, $bornDate: String) {\n    updateAuthor(id: $id, name: $name, biography: $biography, bornDate: $bornDate) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateAuthor($id: String!, $name: String, $biography: String, $bornDate: String) {\n    updateAuthor(id: $id, name: $name, biography: $biography, bornDate: $bornDate) {\n      id\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation DeleteAuthor($id: String!) {\n    deleteAuthor(id: $id) \n  }\n"): (typeof documents)["\n  mutation DeleteAuthor($id: String!) {\n    deleteAuthor(id: $id) \n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetAuthor($id: String!) {\n    authors(id: $id) {\n      id\n      name\n      biography\n      bornDate\n    }\n  }\n"): (typeof documents)["\n  query GetAuthor($id: String!) {\n    authors(id: $id) {\n      id\n      name\n      biography\n      bornDate\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetBooks($page: Int, $pageSize: Int, $authorId: String, $title: String, $fromPublishedDate: String, $toPublishedDate: String) {\n    books(page: $page, pageSize: $pageSize, authorId: $authorId, title: $title, fromPublishedDate: $fromPublishedDate, toPublishedDate: $toPublishedDate) {\n      id\n      title\n      description\n      publishedDate\n      author {\n        id\n        name\n      }\n    }\n    totalBooks(authorId: $authorId, title: $title, fromPublishedDate: $fromPublishedDate, toPublishedDate: $toPublishedDate)\n  }\n"): (typeof documents)["\n  query GetBooks($page: Int, $pageSize: Int, $authorId: String, $title: String, $fromPublishedDate: String, $toPublishedDate: String) {\n    books(page: $page, pageSize: $pageSize, authorId: $authorId, title: $title, fromPublishedDate: $fromPublishedDate, toPublishedDate: $toPublishedDate) {\n      id\n      title\n      description\n      publishedDate\n      author {\n        id\n        name\n      }\n    }\n    totalBooks(authorId: $authorId, title: $title, fromPublishedDate: $fromPublishedDate, toPublishedDate: $toPublishedDate)\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation AddBook($title: String!, $description: String, $publishedDate: String, $authorId: String) {\n    addBook(title: $title, description: $description, publishedDate: $publishedDate, authorId: $authorId) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation AddBook($title: String!, $description: String, $publishedDate: String, $authorId: String) {\n    addBook(title: $title, description: $description, publishedDate: $publishedDate, authorId: $authorId) {\n      id\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation UpdateBook($id: String!, $title: String, $description: String, $publishedDate: String, $authorId: String) {\n    updateBook(id: $id, title: $title, description: $description, publishedDate: $publishedDate, authorId: $authorId) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateBook($id: String!, $title: String, $description: String, $publishedDate: String, $authorId: String) {\n    updateBook(id: $id, title: $title, description: $description, publishedDate: $publishedDate, authorId: $authorId) {\n      id\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation DeleteBook($id: String!) {\n    deleteBook(id: $id)\n  }\n"): (typeof documents)["\n  mutation DeleteBook($id: String!) {\n    deleteBook(id: $id)\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetBook($id: String!) {\n    books(id: $id) {\n      id\n      title\n      description\n      publishedDate\n      authorId\n      rating\n      author {\n        id\n        name\n        biography\n        bornDate\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetBook($id: String!) {\n    books(id: $id) {\n      id\n      title\n      description\n      publishedDate\n      authorId\n      rating\n      author {\n        id\n        name\n        biography\n        bornDate\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetReviews($page: Int, $pageSize: Int, $bookId: String!) {\n    reviews(bookId: $bookId, page: $page, pageSize: $pageSize) {\n      id\n      comment\n      rating\n      createdAt\n    }\n    totalReviews(bookId: $bookId)\n  }\n"): (typeof documents)["\n  query GetReviews($page: Int, $pageSize: Int, $bookId: String!) {\n    reviews(bookId: $bookId, page: $page, pageSize: $pageSize) {\n      id\n      comment\n      rating\n      createdAt\n    }\n    totalReviews(bookId: $bookId)\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation AddReview($bookId: String!, $comment: String!, $rating: Int!) {\n    addReview(bookId: $bookId, comment: $comment, rating: $rating) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation AddReview($bookId: String!, $comment: String!, $rating: Int!) {\n    addReview(bookId: $bookId, comment: $comment, rating: $rating) {\n      id\n    }\n  }\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;