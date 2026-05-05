"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface: any, Sequelize: any) {
    await queryInterface.bulkInsert(
      "categories",
      [
        {
          name: "Roman"
        },
        {
          name: "Science Fiction"
        },
        {
          name: "Fantasy"
        },
        {
          name: "Histoire"
        },
        {
          name: "Programmation"
        },
      ],
      {},
    );
  },

  async down(queryInterface: any, Sequelize: any) {
    await queryInterface.bulkDelete("categories", null, {});
  },
};
