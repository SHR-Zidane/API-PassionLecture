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
  Default,
} from "sequelize-typescript";

import User from "./User";
import Author from "./Author";
import Category from "./Category";
import Review from "./Review";

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
  @Column
  declare title: string;

  @AllowNull(true)
  @Default(null)
  @Column
  declare summary: string;

  @AllowNull(true)
  @Default(null)
  @Column
  declare page_count: number;

  @AllowNull(true)
  @Default(null)
  @Column(DataType.STRING)
  declare extract_pdf: string;

  @AllowNull(true)
  @Default(null)
  @Column
  declare publisher: string;

  @AllowNull(true)
  @Default(null)
  @Column
  declare edition_year: number;

  @AllowNull(true)
  @Default(null)
  @Column(DataType.STRING)
  declare cover_image: string;

  @AllowNull(true)
  @Default(null)
  @Column(DataType.STRING)
  declare epubPath: string;

  @ForeignKey(() => User)
  @AllowNull(true)
  @Default(null)
  @Column(DataType.BIGINT)
  declare userId: number;

  @BelongsTo(() => User)
  declare user: User;

  @ForeignKey(() => Author)
  @AllowNull(true)
  @Default(null)
  @Column(DataType.BIGINT)
  declare authorId: number;

  @BelongsTo(() => Author)
  declare author: Author;

  @ForeignKey(() => Category)
  @AllowNull(true)
  @Default(null)
  @Column(DataType.BIGINT)
  declare categoryId: number;

  @BelongsTo(() => Category)
  declare category: Category;

  @HasMany(() => Review)
  declare reviews: Review[];

  @CreatedAt
  declare created_at: CreationOptional<Date>;

  @UpdatedAt
  declare updated_at: CreationOptional<Date>;
}
