import { Author, Book, type IBook, type IBookCreation } from "../../common/db";
import { type IFilterParams, type IPaginationParams, serviceUtils } from "./serviceUtils";

export interface IFindAllBooksParams extends IPaginationParams, IFilterParams {
  includeAuthor?: boolean;
}

export class BookService {
  async findAll(params: IFindAllBooksParams): Promise<IBook[]> {
    const books = await Book.findAll({
      ...serviceUtils.createPaginationQuery(params),
      ...serviceUtils.createFilterQuery(params),
      ...(params.includeAuthor
        ? {
            include: {
              model: Author,
              as: "author",
            },
          }
        : {}),
    });
    return books;
  }

  async create(bookDetails: IBookCreation): Promise<IBook> {
    const book = await Book.create(bookDetails);
    return book;
  }

  async getTotalCount(): Promise<number> {
    return Book.count();
  }
}

export const bookService = new BookService();
