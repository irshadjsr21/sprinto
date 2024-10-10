import { Author, Book, type IAuthor, type IAuthorCreation, sequelize } from "../../common/db";
import { type IFilterParams, type IPaginationParams, serviceUtils } from "./serviceUtils";

export interface IFindAllAuthorParams extends IPaginationParams, IFilterParams {
  includeBooks?: boolean;
  id?: string;
  name?: string;
}

export class AuthorService {
  async findAll(params: IFindAllAuthorParams): Promise<IAuthor[]> {
    const authors = await Author.findAll({
      where: {
        ...serviceUtils.createFilterQuery({ id: params.id }),
        ...serviceUtils.createFullTextSearchFilterQuery({
          name: params.name,
        }),
      },
      ...serviceUtils.createPaginationQuery(params),
      ...serviceUtils.createIncludeQuery({
        includes: [
          {
            doInclude: params.includeBooks,
            model: Book,
            as: "books",
          },
        ],
      }),
    });
    return authors;
  }

  async create(authorDetails: IAuthorCreation): Promise<IAuthor> {
    const author = await Author.create(authorDetails);
    return author;
  }

  async getTotalCount(): Promise<number> {
    return Author.count();
  }

  async delete(id: string): Promise<void> {
    await Author.destroy({
      where: {
        id,
      },
    });
  }

  async update(id: string, authorDetails: Partial<IAuthorCreation>): Promise<IAuthor> {
    const authors = await Author.update(authorDetails, {
      where: {
        id,
      },
      returning: true,
      limit: 1,
    });

    return authors[1][0];
  }
}

export const authorService = new AuthorService();
