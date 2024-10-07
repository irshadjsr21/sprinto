import type { ModelStatic } from "sequelize";

export interface IPaginationParams {
  pageSize?: number;
  page?: number;
}

export interface IFilterParams {
  id?: string;
}

export interface IIncludeParams {
  includes: {
    doInclude?: boolean;
    model: ModelStatic<any>;
    as: string;
  }[];
}

export class ServiceUtils {
  public createPaginationQuery({ pageSize = 10, page = 1 }: IPaginationParams) {
    return {
      limit: pageSize,
      offset: (page - 1) * pageSize,
    };
  }

  public createFilterQuery(params: IFilterParams) {
    if (params.id) {
      return {
        where: {
          id: params.id,
        },
      };
    }
    return {};
  }

  public createIncludeQuery(params: IIncludeParams) {
    if (params.includes) {
      return {
        include: params.includes
          .filter((i) => i.doInclude)
          .map((i) => ({
            model: i.model,
            as: i.as,
          })),
      };
    }
    return {};
  }
}

export const serviceUtils = new ServiceUtils();
