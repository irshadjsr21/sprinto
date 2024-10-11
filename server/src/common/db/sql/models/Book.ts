import {
  type CreationOptional,
  DataTypes,
  type InferAttributes,
  type InferCreationAttributes,
  type Model,
} from "sequelize";
import { sequelize } from "../connection";

export interface IBookCreation {
  title: string;
  description?: string;
  publishedDate?: Date;
  authorId?: string;
}

export interface IBook extends IBookCreation, Model<InferAttributes<IBook>, InferCreationAttributes<IBook>> {
  id: CreationOptional<string>;
}

export const Book = sequelize.define<IBook>(
  "Book",
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
    },
    publishedDate: {
      type: DataTypes.DATE,
    },
    authorId: {
      type: DataTypes.UUID,
    },
  },
  {
    timestamps: true,
  },
);

export default IBook;
