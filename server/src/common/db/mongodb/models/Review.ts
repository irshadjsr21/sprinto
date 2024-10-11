import mongoose, { type Schema } from "mongoose";

export interface IReview extends Document {
  bookId: string;
  rating: number;
  comment: string;
  createdAt: Date;
  updatedAt: Date;
}

const reviewSchema: Schema<IReview> = new mongoose.Schema(
  {
    bookId: { type: String, required: true },
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
  },
  {
    timestamps: true,
  },
);

export const Review = mongoose.model<IReview>("Review", reviewSchema);
