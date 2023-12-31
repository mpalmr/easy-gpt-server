import type { Knex } from 'knex';

export async function up(knex: Knex) {
  await knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');

  await knex.schema
    .createTable('users', (table) => {
      table
        .uuid('id')
        .notNullable()
        .defaultTo(knex.raw('uuid_generate_v4()'))
        .primary();

      table
        .string('email', 320)
        .notNullable()
        .unique();

      table
        .text('passwordHash')
        .notNullable();

      table
        .timestamp('createdAt')
        .notNullable()
        .defaultTo(knex.fn.now());
    })
    .createTable('userVerifications', (table) => {
      table
        .uuid('id')
        .notNullable()
        .defaultTo(knex.raw('uuid_generate_v4()'))
        .primary();

      table
        .uuid('userId')
        .notNullable()
        .references('id')
        .inTable('users')
        .onDelete('CASCADE');

      table.timestamp('verifiedAt');

      table
        .timestamp('createdAt')
        .notNullable()
        .defaultTo(knex.fn.now());
    })
    .createTable('conversations', (table) => {
      table
        .uuid('id')
        .notNullable()
        .defaultTo(knex.raw('uuid_generate_v4()'))
        .primary();

      table
        .uuid('userId')
        .notNullable()
        .references('id')
        .inTable('users')
        .onDelete('CASCADE');

      table
        .text('label')
        .notNullable();

      table
        .timestamp('createdAt')
        .notNullable()
        .defaultTo(knex.fn.now());
    });
}

export async function down(knex: Knex) {
  await knex.schema
    .dropTableIfExists('conversations')
    .dropTableIfExists('userVerifications')
    .dropTableIfExists('users');

  await knex.raw('DROP EXTENSION IF EXISTS "uuid-ossp"');
}
