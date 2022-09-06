const express = require('express');
const router = express.Router();

const OrderServiceInstance = require('../services/OrderService');

module.exports = app => {
  app.use('/orders', router);

  router.get('/', async (req, res, next) => {
    try {
      const { id } = req.user;

      const response = await OrderServiceInstance.list(id);
      res.status(200).send(response);
    } catch (err) {
      next(err);
    }
  });

  router.get('/:orderId', async (req, res, next) => {
    try {
      const { orderId } = req.params;

      const response = await OrderServiceInstance.findById(orderId);
      res.status(200).send(response);
    } catch (err) {
      next(err);
    }
  });
};
