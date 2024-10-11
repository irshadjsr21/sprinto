import { gql } from "@/__generated__";

export const GET_REVIEWS = gql(`
  query GetReviews($page: Int, $pageSize: Int, $bookId: String!) {
    reviews(bookId: $bookId, page: $page, pageSize: $pageSize) {
      id
      comment
      rating
      createdAt
    }
    totalReviews(bookId: $bookId)
  }
`);

export const ADD_REVIEW = gql(`
  mutation AddReview($bookId: String!, $comment: String!, $rating: Int!) {
    addReview(bookId: $bookId, comment: $comment, rating: $rating) {
      id
    }
  }
`);
