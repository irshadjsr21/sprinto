import { type ModelStatic, Op } from "sequelize";
import { sequelize } from "../../common/db";

export interface IPaginationParams {
  pageSize?: number;
  page?: number;
}

export type IFilterParams = Record<string, any>;

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

  public createPaginationQueryForMongo({
    pageSize = 10,
    page = 1,
  }: IPaginationParams) {
    return {
      limit: pageSize,
      skip: (page - 1) * pageSize,
    };
  }

  public createFilterQuery(filterOptions: IFilterParams) {
    const params = structuredClone(filterOptions);

    for (const key in params) {
      if (params[key] === undefined || params[key] === null) {
        delete params[key];
      }
    }

    return {
      ...params,
    };
  }

  public createFullTextSearchFilterQuery(filterOptions: IFilterParams) {
    const params = structuredClone(filterOptions);

    for (const key in params) {
      if (params[key] === undefined || params[key] === null) {
        delete params[key];
      }
    }

    const result: Record<string, any> = {};

    for (const key in params) {
      result[key] = {
        [Op.iLike]: `%${params[key]}%`,
      };
    }

    return result;
  }

  public createDateFilterQuery(
    filterOptions: Record<string, { gte?: string; lte?: string }>
  ) {
    const params = structuredClone(filterOptions);

    for (const key in params) {
      if (params[key] === undefined || params[key] === null) {
        delete params[key];
      }
    }

    const result: Record<string, any> = {};

    for (const key in params) {
      if (!params[key].gte && !params[key].lte) {
        continue;
      }

      result[key] = {};
      if (params[key].gte) {
        result[key][Op.gte] = new Date(params[key].gte);
      }

      if (params[key].lte) {
        result[key][Op.lte] = new Date(params[key].lte);
      }
    }

    return result;
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
