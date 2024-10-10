import { Author } from "./Author";
import { Book } from "./Book";

const runAssosiations = () => {
  Book.hasOne(Author, {
    foreignKey: "id",
    sourceKey: "authorId",
    as: "author",
    onDelete: "SET NULL",
    onUpdate: "CASCADE",
  });

  Author.hasMany(Book, {
    foreignKey: "authorId",
    sourceKey: "id",
    as: "books",
    onDelete: "SET NULL",
    onUpdate: "CASCADE",
  });
};

runAssosiations();

export * from "./Book";
export * from "./Author";
