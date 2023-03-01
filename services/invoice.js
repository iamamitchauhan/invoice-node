const Invoice = require('../models/invoice');
const moment = require("moment")

const get = async ({ skip, limit, search, sortBy, date }) => {

  try {
    const regExp = new RegExp(search, "ig");


    let matchRegExpArray = [
      { reference: regExp },
      { customer: regExp },
      { status: regExp },
      { amount_due: regExp },
      { currency: regExp },
      { invoice_amount: regExp },
    ]

    match = {
      $and: [{ $or: matchRegExpArray }]
    }

    if (date) {
      const startDate = moment(date).startOf("day");
      const endDate = moment(date).endOf("day");

      match = {
        $and: [{ $or: matchRegExpArray }, { "invoice_date": { $gte: new Date(startDate), $lte: new Date(endDate) } }]
      }
    }

    const response = await Invoice.aggregate([
      { $match: match },
      { $sort: sortBy },
      { $skip: skip },
      { $limit: limit }
    ]);

    // fetch total records which match search condition for total pages
    const totalRecords = await Invoice.aggregate([
      { $match: match },
    ]);

    return { data: response, totalPages: Math.ceil(totalRecords.length / limit) };
  } catch (err) {
    throw err;
  }

}
module.exports = {
  get
}