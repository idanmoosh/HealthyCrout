const db = require('../db');
const pgp = require('pg-promise')();
const OrderItem = require('./orderItem');

module.exports = data => {
  const items = data.items || [];
  const status = data.status || 'PENDING';
  const total = data.total || 0;
  const userId = data.userId || null;
  const created = data.created || Date.now().toISOString();
  const modified = Date.now().toISOString();
  const converted = data.converted || null;
  const isActive = data.isActive || true;

  const addItems = items => {
    const allItems = items.map(item => newOrderItem(item));
    return allItems;
  };

  async function create(data) {
    try {
      const { items, ...order } = data;

      const statement =
        pgp.helpers.insert(order, null, 'order') + ' RETURNING *';
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
      const { id } = data;
      const condition = pgp.as.format(`WHERE id = ${id} RETURNING *`);
      const statement = pgp.helpers.update(data, null, 'order') + condition;

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

  async function findByUser(userId) {
    try {
      // Generate SQL statement
      const statement = `SELECT *
                         FROM order
                         WHERE "userId" = $1`;
      const values = [userId];

      // Execute SQL statment
      const result = await db.query(statement, values);

      if (result.rows?.length) {
        return result.rows[0];
      }

      return null;
    } catch (err) {
      throw new Error(err);
    }
  }

  async function findById(orderId) {
    try {
      // Generate SQL statement
      const statement = `SELECT *
                         FROM order
                         WHERE id = $1`;
      const values = [orderId];

      // Execute SQL statment
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
