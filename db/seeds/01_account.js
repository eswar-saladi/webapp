/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  // await knex("accounts").del();
  await knex("accounts").insert([
    {
      first_name: "Eswar",
      last_name: "Saladi",
      username: "eswarsaladi",
      password: "password",
      phone: "1234567890",
    },
  ]);
};
