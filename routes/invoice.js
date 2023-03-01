const express = require('express');
const router = express.Router();

const invoice = require('../services/invoice');

/* GET invoice listing. */
router.post('/', async (req, res, next) => {

  try {
    const { page, limit, search, sortBy, date } = req.body;
    const skip = page * limit;

    const { data, totalPages } = await invoice.get({ skip, limit, search, sortBy, date });

    res.status(200).json({ msg: "data fetched", data, totalPages });

  } catch (err) {
    console.log("err while fetching invoice", err)
    res.status(500).json({
      msg: "Something went wrong"
    });

  }
});

module.exports = router;
