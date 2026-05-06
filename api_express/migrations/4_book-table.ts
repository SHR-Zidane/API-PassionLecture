import { DataTypes, Sequelize } from "sequelize";
import type { Migration } from "../umzug";

export const up: Migration = async ({ context: sequelize }) => {
  await sequelize.getQueryInterface().createTable("books", {
    id: {
      type: DataTypes.BIGINT,
      allowNull: true,
      primaryKey: true,
      autoIncrement: true,
    },
    
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    summary: {
      type: DataTypes.TEXT,
      allowNull: true,
      defaultValue: null,
    },
    page_count: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: null,
    },
    extract_pdf: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null,
    },
    publisher: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null,
    },
    edition_year: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: null,
    },
    cover_image: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null,
    },
    epubPath: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null,
    },
    
    userId: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: {
        model: "users",
        key: "id",
      },
      defaultValue: null,
    },
    authorId: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: {
        model: "authors",
        key: "id",
      },
      defaultValue: null,
    },
    categoryId: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: {
        model: "categories",
        key: "id",
      },
      defaultValue: null,
    },
    
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
    },
  });
};

export const down: Migration = async ({ context: sequelize }) => {
  await sequelize.getQueryInterface().dropTable("books");
};