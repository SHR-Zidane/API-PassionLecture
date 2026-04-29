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
} from "sequelize-typescript";

@Table({
  tableName: "books",
  modelName: "Book",
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
  declare edition_year: Date;
  
  @AllowNull(false)
  @Column(DataType.BLOB)
  declare cover_image: Buffer;

  @CreatedAt
  declare created_at: CreationOptional<Date>;

  @UpdatedAt
  declare updated_at: CreationOptional<Date>;
}