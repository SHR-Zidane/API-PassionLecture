import {
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
} from 'sequelize';
import {
  AllowNull,
  Column,
  CreatedAt,
  DataType,
  Model,
  Table,
  Unique,
  UpdatedAt,
  HasMany
} from 'sequelize-typescript';
import Book from './Book';

@Table({
  tableName: 'authors',
  modelName: 'Author',
})
export default class Author extends Model<
  InferAttributes<Author>,
  InferCreationAttributes<Author>
> {
  @Column({
    primaryKey: true,
    type: DataType.BIGINT,
    autoIncrement: true,
  })
  declare id: CreationOptional<number>;

  @AllowNull(false)
  @Column
  declare first_name: string;

  @AllowNull(false)
  @Column
  declare last_name: string;
  
  @HasMany(() => Book)
  declare books: Book[];

  @CreatedAt
  declare created_at: CreationOptional<Date>;

  @UpdatedAt
  declare updated_at: CreationOptional<Date>;
}
