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
  HasMany,
} from "sequelize-typescript";
import Book from './Book';

@Table({
  tableName: "categories",
  modelName: "Category",
})
export default class Category extends Model<
  InferAttributes<Category>,
  InferCreationAttributes<Category>
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
  declare name: string;
  
  @HasMany(() => Book)
  declare books: Book[];

  @CreatedAt
  declare created_at: CreationOptional<Date>;

  @UpdatedAt
  declare updated_at: CreationOptional<Date>;
}