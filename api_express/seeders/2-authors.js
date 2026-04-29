"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "authors",
      [
        {
          first_name: "Auteur1",
          last_name: "fsdjhfasjd",
        },
        {
          first_name: "AuteurX",
          last_name: "dasdsa",
        },
        {
          first_name: "AuteurASDdbasdas",
          last_name: "dasdas",
        },
        {
          first_name: "Jean",
          last_name: "Dupont",
        },
        {
          first_name: "Marie",
          last_name: "Curie",
        },
        {
          first_name: "Paul",
          last_name: "Martin",
        },
      ],
      {},
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("authors", null, {});
  },
};
