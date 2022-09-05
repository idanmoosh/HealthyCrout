const db = require('../db/index');
const pgp = require('pg-promise')({
  capsSQL: true,
});

async function create(data) {
  try {
    // Generate SQL statement - using helper for dynamic parameter injection
    const statement = pgp.helpers.insert(data, null, 'users') + 'RETURNING *';

    // Execute SQL statment
    const result = await db.query(statement);

    if (result.rows?.length) {
      return result.rows[0];
    }

    return null;
  } catch (err) {
    throw new Error(err);
  }
}

async function update(data) {
  try {
    const { id, ...params } = data;
    const condition = pgp.as.format(`WHERE id = ${id} RETURNING *`, { id });
    const statement = pgp.helpers.update(paprams, null, 'users') + condition;

    const result = await db.query(statement);
    if (result.rows?.length) {
      return result.rows[0];
    }
    return null;
  } catch (err) {
    throw new Error(err);
  }
}

module.exports = {
  create: create,
};
