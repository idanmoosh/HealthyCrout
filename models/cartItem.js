const db = require('../db');
const pgp = require('pg-promise')();

module.exports = () => {
  async function create(data) {
    try {
      const statement =
        pgp.helpers.insert(data, null, 'cart_item') + 'RETURNING *';
      const result = await db.query(statement);

      if (result.rows?.length) {
        return result.rows[0];
      }
      return null;
    } catch (err) {
      throw new Error(err);
    }
  }
  async function update(id, data) {
    try {
      const condition = pgp.as.format(`WHERE id =${id} RETURNING *`, { id });
      const statement = pgp.helpers.update(data, null, 'cart_item') + condition;

      const result = await db.query(statement);
      if (result.rows?.length) {
        return result.rows[0];
      }
      return null;
    } catch (err) {
      throw new Error(err);
    }
  }

  async function find(cartId) {
    try {
      const statement =
        'SELECT qty, id AS cartItemId FOM cart_item JOIN SELECT * FROM product where product.id = cart_item.id where cart_item.id = $1';
      const values = [cartId];

      const result = await db.query(statement, values);
      if (result.rows?.length) {
        return result.rows[0];
      }
      return null;
    } catch (err) {
      throw new Error(err);
    }
  }

  async function deleteItem(id) {
    try {
      const statement = 'DELETE FROM cart_item WHERE id = $1 RETURNING *';
      const values = [id];

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
