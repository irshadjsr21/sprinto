import { gql } from "@/__generated__";

export const GET_BOOKS = gql(`
  query GetBooks($page: Int, $pageSize: Int, $authorId: String, $title: String) {
    books(page: $page, pageSize: $pageSize, authorId: $authorId, title: $title) {
      id
      title
      description
      publishedDate
      author {
        id
        name
      }
    }
    totalBooks(authorId: $authorId)
  }
`);

export const ADD_BOOK = gql(`
  mutation AddBook($title: String!, $description: String, $publishedDate: String, $authorId: String) {
    addBook(title: $title, description: $description, publishedDate: $publishedDate, authorId: $authorId) {
      id
    }
  }
`);

export const UPDATE_BOOK = gql(`
  mutation UpdateBook($id: String!, $title: String, $description: String, $publishedDate: String, $authorId: String) {
    updateBook(id: $id, title: $title, description: $description, publishedDate: $publishedDate, authorId: $authorId) {
      id
    }
  }
`);

export const DELETE_BOOK = gql(`
  mutation DeleteBook($id: String!) {
    deleteBook(id: $id) {
      id
    }
  }
`);

export const GET_BOOK_QUERY = gql(`
  query GetBook($id: String!) {
    books(id: $id) {
      id
      title
      description
      publishedDate
      authorId
      rating
      author {
        id
        name
        biography
        bornDate
      }
    }
  }
`);
