/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */
export const shorthands = undefined;

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const up = (pgm) => {

    pgm.dropIndex('loans', 'user_id', { name: 'loans_user_id_idx' });
  pgm.dropColumn('loans', 'user_id');

  pgm.addColumn('loans', {
    auth0_sub: { type: 'text', notNull: true }
  });

  pgm.createIndex('loans', 'auth0_sub', { name: 'loans_auth0_sub_idx' });

  pgm.dropTable('users');
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const down = (pgm) => {

    pgm.sql(`
    CREATE TABLE users (
      id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      auth0_sub text NOT NULL UNIQUE,
      email text NOT NULL UNIQUE,
      username text NOT NULL UNIQUE,
      is_admin boolean NOT NULL DEFAULT false
    );
  `);

  pgm.dropIndex('loans', 'auth0_sub', { name: 'loans_auth0_sub_idx' });
  pgm.dropColumn('loans', 'auth0_sub');
  pgm.addColumn('loans', {
    user_id: { 
      type: 'uuid', 
      notNull: true, 
      references: 'users(id)', 
      onDelete: 'RESTRICT' 
    }
  });
  pgm.createIndex('loans', 'user_id', { name: 'loans_user_id_idx' });
};
