const express = require('express');
const router = express.Router();
const Expense = require('../models/expense');

// route GET /api/expenses
//  Get all expenses
router.get('/', async (req, res) => {
  try {
    const expenses = await Expense.find();
    res.json(expenses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// route POST /api/expenses
// Create an expense
router.post('/', async (req, res) => {
  const { amount, description, date, type } = req.body;

  const expense = new Expense({
    amount,
    description,
    date,
    type,
  });

  try {
    const newExpense = await expense.save();
    res.status(201).json(newExpense);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// @route DELETE /api/expenses/:id
//  Delete an expense
router.delete('/:id', async (req, res) => {
  try {
    await Expense.findByIdAndDelete(req.params.id);
    res.json({ message: 'Expense deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
