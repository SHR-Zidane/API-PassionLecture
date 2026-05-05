"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface: any, Sequelize: any) {
    await queryInterface.bulkInsert(
      "reviews",
      [
        {
          rating: 5,
          comment: "",
          published_at: new Date(),
          userId: 1,
          bookId: 1
        },
      ],
      {},
    );
  },

  async down(queryInterface: any, Sequelize: any) {
    await queryInterface.bulkDelete("reviews", null, {});
  },
};
