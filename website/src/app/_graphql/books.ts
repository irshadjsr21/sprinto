import { gql } from "@/__generated__";

export const GET_BOOKS = gql(`
  query GetBooks($page: Int, $pageSize: Int) {
    books(page: $page, pageSize: $pageSize) {
      id
      title
      description
      publishedDate
      author {
        id
        name
      }
    }
    totalBooks
  }
`);

export const ADD_BOOK = gql(`
  mutation AddBook($title: String!, $description: String, $publishedDate: String, $authorId: String) {
    addBook(title: $title, description: $description, publishedDate: $publishedDate, authorId: $authorId) {
      id
      title
      description
      publishedDate
    }
  }
`);
