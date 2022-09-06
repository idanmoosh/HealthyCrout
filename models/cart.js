const db = require('../db');
const pgp = require('pg-promise')();

module.exports = data => {
  const created = data.created || Date.now().toISOString();
  const modified = Date.now().toISOString();
  const converted = data.converted || null;
  const isActive = data.isActive || true;

  async function create(data) {
    try {
      const data = { userId, ...data };
      // generate SQL statement
      const statement = pgp.helpers.insert(data, null, 'cart') + 'RETURNIN *';
      //EXECUTE SQL
      const result = await db.query(statement);
      if (result.rows?.length) {
        return result.rows[0];
      }
      return null;
    } catch (err) {
      throw new Error(err);
    }
  }
  async function findOneByUser(userId) {
    try {
      const statement = `SELECT * FROM cart WHERE userId = $1`;
      const values = [userId];

      //execution
      const result = await db.query(statement, values);
      if (result.rows?.length) {
        return result.rows[0];
      }
      return null;
    } catch (err) {
      throw new Error(err);
    }
  }

  async function findOneById(Id) {
    try {
      const statement = `SELECT * FROM cart WHERE id = $1`;
      const values = [Id];

      //execution
      const result = await db.query(statement, values);
      if (result.rows?.length) {
        return result.rows[0];
      }
      return null;
    } catch (err) {
      throw new Error(err);
    }
  }
};
