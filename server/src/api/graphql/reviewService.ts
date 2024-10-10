import { type IReview, Review } from "../../common/db";
import { bookService } from "./bookService";
import { type IPaginationParams, serviceUtils } from "./serviceUtils";

export interface IFindAllReviewsParams extends IPaginationParams {
  bookId: string;
}

export class ReviewService {
  async findAll(params: IFindAllReviewsParams): Promise<IReview[]> {
    const reviews = await Review.find(
      {
        bookId: params.bookId,
      },
      undefined,
      {
        ...serviceUtils.createPaginationQueryForMongo(params),
      },
    );
    return reviews;
  }

  async create(reviewDetails: Partial<IReview>): Promise<IReview> {
    if (reviewDetails.rating && (reviewDetails.rating < 1 || reviewDetails.rating > 5)) {
      throw new Error("Rating must be between 1 and 5");
    }

    const book = await bookService.findAll({ id: reviewDetails.bookId });
    if (!book.length) {
      throw new Error("Book not found");
    }

    const review = await Review.create(reviewDetails);
    return review;
  }

  async getTotalCount(bookId: string): Promise<number> {
    return Review.countDocuments({ bookId });
  }

  async delete(id: string): Promise<void> {
    await Review.deleteOne({
      _id: id,
    });
  }

  async update(id: string, reviewDetails: Partial<IReview>): Promise<IReview> {
    const review = await Review.findOneAndUpdate({ _id: id }, reviewDetails, {
      new: true,
    });

    if (!review) {
      throw new Error("Review not found");
    }

    return review;
  }

  async getBookRating(bookId: string): Promise<number> {
    const data = await Review.aggregate([
      {
        $match: {
          bookId,
        },
      },
      {
        $group: {
          _id: "$bookId",
          rating: {
            $avg: "$rating",
          },
        },
      },
    ]);

    return data[0]?.rating;
  }
}

export const reviewService = new ReviewService();
