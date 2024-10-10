import { gql } from "@/__generated__";

export const GET_AUTHORS = gql(`
  query GetAuthors($page: Int, $pageSize: Int) {
    authors(page: $page, pageSize: $pageSize) {
      id
      name
      bornDate
    }
    totalAuthors
  }
`);

export const ADD_AUTHOR = gql(`
  mutation AddAuthor($name: String!, $biography: String, $bornDate: String) {
    addAuthor(name: $name, biography: $biography, bornDate: $bornDate) {
      id
    }
  }
`);

export const UPDATE_AUTHOR = gql(`
  mutation UpdateAuthor($id: String!, $name: String, $biography: String, $bornDate: String) {
    updateAuthor(id: $id, name: $name, biography: $biography, bornDate: $bornDate) {
      id
    }
  }
`);

export const DELETE_AUTHOR = gql(`
  mutation DeleteAuthor($id: String!) {
    deleteAuthor(id: $id) {
      id
    }
  }
`);

export const GET_AUTHOR_QUERY = gql(`
  query GetAuthor($id: String!) {
    authors(id: $id) {
      id
      name
      biography
      bornDate
    }
  }
`);
