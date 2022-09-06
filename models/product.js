const db = require('../db');

module.exports = () => {
  async function find() {
    try {
      const statement = `SELECT * FROM product`;
      const values = [];

      const result = await db.query(statement, values);

      if (result.rows?.length) {
        return result.rows;
      }
      return [];
    } catch (err) {
      throw err;
    }
  }
  async function findById(id) {
    try {
      const statement = `SELECT * FROM product WHERE id = ${id}`;
      const values = [id];

      const result = await db.query(statement, values);

      if (result.rows?.length) {
        return result.rows[0];
      }
      return null;
    } catch (err) {
      throw err;
    }
  }
};
