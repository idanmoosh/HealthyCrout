const db = require('../db');
const pgp = require('pg-promise')();

module.exports = data => {
  const description = data.description;
  const name = data.name;
  const price = data.price || 0;
  const productId = data.id;
  const qty = data.qty || 1;
  const orderId = data.orderId || null;
  const created = data.created || Date.now().toISOString();
  const modified = Date.now().toISOString();

  async function create(data) {
    try {
      const statement =
        pgp.helpers.insert(data, null, 'order_order_item') + 'RETURNING *';

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

  async function find(orderId) {
    try {
      // Generate SQL statement
      const statement = `SELECT
                            qty,
                            id AS "cart_item_id",
                         FROM "order_item"
                         INNER JOIN product  ON productid AS "product_id"
                         WHERE "order_id" = $1`;
      const values = [orderId];

      // Execute SQL statment
      const result = await db.query(statement, values);

      if (result.rows?.length) {
        return result.rows;
      }

      return [];
    } catch (err) {
      throw new Error(err);
    }
  }
};
