"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface: any, Sequelize: any) {
    await queryInterface.bulkInsert(
      "books",
      [
        {
          title: "Le Petit Prince",
          summary: "",
          page_count: 254,
          extract_pdf: null,
          publisher: "",
          edition_year: 1943,
          cover_image: null,
          userId: 1,
          authorId: 1,
          categoryId: 1,
        },
        {
          title: "Mein Kampf",
          summary: "Livre d'idéologies",
          page_count: 1,
          extract_pdf: null,
          publisher: "H",
          edition_year: 1939,
          cover_image: null,
          userId: 3,
          authorId: 2,
          categoryId: 4,
        },
        {
          title: "La Recherche du Temps Perdu",
          summary: "Livrejsfdnlifndlsfjnsdhfnkdjhfbkjsdhfbkjghsbfgkjhfd",
          page_count: 1,
          extract_pdf: null,
          publisher: "ADNSdnsahkdasd",
          edition_year: 1967,
          cover_image: null,
          userId: 1,
          authorId: 2,
          categoryId: 4,
        },
      ],
      {},
    );
  },

  async down(queryInterface: any, Sequelize: any) {
    await queryInterface.bulkDelete("books", null, {});
  },
};
