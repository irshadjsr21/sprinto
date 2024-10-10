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

  async delete(id: string): Promise<void> {
    await Book.destroy({
      where: {
        id,
      },
    });
  }

  async update(id: string, bookDetails: Partial<IBookCreation>): Promise<IBook> {
    const books = await Book.update(bookDetails, {
      where: {
        id,
      },
      returning: true,
      limit: 1,
    });

    return books[1][0];
  }
}

export const bookService = new BookService();
