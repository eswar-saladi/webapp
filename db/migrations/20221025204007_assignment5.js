/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema
    .createTable("accounts", function (table) {
      table
        .uuid("id")
        .unique()
        .notNullable()
        .primary()
        .defaultTo(knex.raw("gen_random_uuid()"));
      table.string("first_name").notNullable();
      table.string("last_name");
      table.string("username").notNullable().unique();
      table.string("password").notNullable();
      table.string("phone");
      table.boolean("is_verified").defaultTo(false);
      table.timestamp("account_created").defaultTo(knex.fn.now());
      table.timestamp("account_updated").defaultTo(knex.fn.now());
    })
    .createTable("documents", function (table) {
      table
        .uuid("id")
        .unique()
        .notNullable()
        .primary()
        .defaultTo(knex.raw("gen_random_uuid()"));
      table.uuid("user_id").notNullable().references("id").inTable("accounts");
      table.string("name").notNullable();
      table.string("s3_bucket_path").notNullable();
      table.timestamp("date_created").defaultTo(knex.fn.now());
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("accounts").dropTable("documents");
};
