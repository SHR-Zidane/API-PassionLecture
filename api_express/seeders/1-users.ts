"use strict";

declare const module: any;

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface: any, Sequelize: any) {
    await queryInterface.bulkInsert(
      "users",
      [
        {
          username: "sennalachienneté",
          email: "zidane@test.ch",
          password: "123123",
          join_date: new Date(),
          is_admin: true,
        },
        {
          username: "erdemmmm",
          email: "tsekfjsldf@dfsdf.com",
          password: "123123",
          join_date: new Date(),
          is_admin: false,
        },
        {
          username: "Snehan X Hugo",
          email: "atraf@dfsdf.com",
          password: "123123",
          join_date: new Date(),
          is_admin: false,
        },
      ],
      {},
    );
  },

  async down(queryInterface: any, Sequelize: any) {
    await queryInterface.bulkDelete("users", null, {});
  },
};
