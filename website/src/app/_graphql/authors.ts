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
      name
      bornDate
    }
  }
`);
