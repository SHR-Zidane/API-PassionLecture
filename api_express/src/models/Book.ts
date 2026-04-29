import {
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
} from "sequelize";
import {
  AllowNull,
  Column,
  CreatedAt,
  DataType,
  Model,
  Table,
  Unique,
  UpdatedAt,
  ForeignKey,
  BelongsTo,
  HasMany,
} from "sequelize-typescript";

import User from "./User";
import Author from "./Author";
import Category from "./Category";

@Table({
  tableName: "books",
  modelName: "Book",
})
export default class Book extends Model<
  InferAttributes<Book>,
  InferCreationAttributes<Book>
> {
  @Column({
    primaryKey: true,
    type: DataType.BIGINT,
    autoIncrement: true,
  })
  declare id: CreationOptional<number>;

  @AllowNull(false)
  @Unique
  @Column
  declare title: string;

  @AllowNull(false)
  @Column
  declare summary: string;

  @AllowNull(false)
  @Column
  declare page_count: number;

  @AllowNull(false)
  @Column(DataType.BLOB)
  declare extract_pdf: Buffer;

  @AllowNull(false)
  @Column
  declare publisher: string;

  @AllowNull(false)
  @Column
  declare edition_year: number;

  @ForeignKey(() => User)
  @AllowNull(false)
  @Column(DataType.BIGINT)
  declare userId: number;

  @BelongsTo(() => User)
  declare user: User;

  @ForeignKey(() => Author)
  @AllowNull(false)
  @Column(DataType.BIGINT)
  declare authorId: number;

  @BelongsTo(() => Author)
  declare author: Author;

  @ForeignKey(() => Category)
  @AllowNull(false)
  @Column(DataType.BIGINT)
  declare categoryId: number;

  @BelongsTo(() => Category)
  declare category: Category;

  @AllowNull(false)
  @Column(DataType.BLOB)
  declare cover_image: Buffer;

  @CreatedAt
  declare created_at: CreationOptional<Date>;

  @UpdatedAt
  declare updated_at: CreationOptional<Date>;
}
