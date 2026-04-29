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
} from 'sequelize-typescript';

@Table({
  tableName: 'review',
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
}
