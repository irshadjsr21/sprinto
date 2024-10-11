import { Author, Book, type IBook, type IBookCreation } from "../../common/db";
import {
  type IFilterParams,
  type IPaginationParams,
  serviceUtils,
} from "./serviceUtils";

export interface IFindAllBooksParams extends IPaginationParams, IFilterParams {
  id?: string;
  authorId?: string;
  includeAuthor?: boolean;
  title?: string;
  fromPublishedDate?: string;
  toPublishedDate?: string;
}

export class BookService {
  async findAll(params: IFindAllBooksParams): Promise<IBook[]> {
    const books = await Book.findAll({
      where: {
        ...serviceUtils.createFilterQuery({
          id: params.id,
          authorId: params.authorId,
        }),
        ...serviceUtils.createFullTextSearchFilterQuery({
          title: params.title,
        }),
        ...serviceUtils.createDateFilterQuery({
          publishedDate: {
            gte: params.fromPublishedDate,
            lte: params.toPublishedDate,
          },
        }),
      },
      ...serviceUtils.createPaginationQuery(params),
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

  async getTotalCount(params: {
    authorId?: string;
    title?: string;
    fromPublishedDate?: string;
    toPublishedDate?: string;
  }): Promise<number> {
    const query = {
      ...serviceUtils.createFullTextSearchFilterQuery({
        title: params.title,
      }),
      ...serviceUtils.createDateFilterQuery({
        publishedDate: {
          gte: params.fromPublishedDate,
          lte: params.toPublishedDate,
        },
      }),
    };
    return Book.count({
      where: params.authorId
        ? {
            authorId: params.authorId,
            ...query,
          }
        : query,
    });
  }

  async delete(id: string): Promise<string> {
    await Book.destroy({
      where: {
        id,
      },
    });

    return id;
  }

  async update(
    id: string,
    bookDetails: Partial<IBookCreation>
  ): Promise<IBook> {
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
