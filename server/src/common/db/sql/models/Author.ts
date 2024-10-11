import {
  type CreationOptional,
  DataTypes,
  type InferAttributes,
  type InferCreationAttributes,
  type Model,
} from "sequelize";
import { sequelize } from "../connection";

export interface IAuthorCreation {
  name: string;
  biography?: string;
  bornDate?: Date;
}

export interface IAuthor extends IAuthorCreation, Model<InferAttributes<IAuthor>, InferCreationAttributes<IAuthor>> {
  id: CreationOptional<string>;
}

export const Author = sequelize.define<IAuthor>(
  "Author",
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    biography: {
      type: DataTypes.TEXT,
    },
    bornDate: {
      type: DataTypes.DATE,
    },
  },
  {
    timestamps: true,
  },
);
