"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
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

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("categories", null, {});
  },
};
