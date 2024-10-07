import { Author } from "./Author";
import { Book } from "./Book";

const runAssosiations = () => {
  Book.hasOne(Author, {
    foreignKey: "id",
    sourceKey: "authorId",
    as: "author",
  });

  Author.hasMany(Book, {
    foreignKey: "authorId",
    sourceKey: "id",
    as: "books",
  });
};

runAssosiations();

export * from "./Book";
export * from "./Author";
