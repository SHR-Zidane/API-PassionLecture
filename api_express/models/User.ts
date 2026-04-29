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
  HasMany
} from "sequelize-typescript";
import Book from './Book';
import Review from './Review';


@Table({
  tableName: "users",
  modelName: "User",
})
export default class User extends Model<
  InferAttributes<User>,
  InferCreationAttributes<User>
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
  declare username: string;

  @AllowNull(false)
  @Unique
  @Column
  declare email: string;
  
  @AllowNull(false)
  @Column
  declare password: string;
  
  @CreatedAt
  declare join_date: CreationOptional<Date>;
  
  @Column
  declare is_admin: boolean;
  
  @HasMany(() => Book)
  declare books: Book[];

  @HasMany(() => Review)
  declare reviews: Review[];
  
  @CreatedAt
  declare created_at: CreationOptional<Date>;

  @UpdatedAt
  declare updated_at: CreationOptional<Date>;
}