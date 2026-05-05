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
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import User from './User';
import Book from './Book';

@Table({
  tableName: 'reviews',
  modelName: 'Review',
})
export default class Review extends Model<
  InferAttributes<Review>,
  InferCreationAttributes<Review>
> {
  @Column({
    primaryKey: true,
    type: DataType.BIGINT,
    autoIncrement: true,
  })
  declare id: CreationOptional<number>;

  @AllowNull(true)
  @Column
  declare rating: number;

  @AllowNull(true)
  @Column
  declare comment: string;

  @AllowNull(true)
  @Column
  declare published_at: Date;

  @CreatedAt
  declare created_at: CreationOptional<Date>;

  @UpdatedAt
  declare updated_at: CreationOptional<Date>;

  @ForeignKey(() => User)
  @Column({ type: DataType.BIGINT })
  declare userId: number;

  @BelongsTo(() => User)
  declare user: User;

  @ForeignKey(() => Book)
  @Column({ type: DataType.BIGINT })
  declare bookId: number;

  @BelongsTo(() => Book)
  declare book: Book;
}
