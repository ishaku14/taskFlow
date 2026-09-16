const categoryService = require("../services/category.service");

exports.getAllCategories = async (req, res) => {
  try {
    const userId = req.user.userId;
    const categories = await categoryService.getAllCategories(userId);
    res.status(200).json(categories);
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message });
  }
}

exports.createCategory = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { name } = req.body;
    const category = await categoryService.createCategory(userId, name);
    res.status(201).json(category);
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message || "can't create new task"});
  }
}

exports.updateCategory = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { name } = req.body;
    const id = req.params.id;
    const category = await categoryService.updateCategory(userId, name, id);
    res.status(200).json(category);
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message || "category update failed!" });
  }
}

exports.deleteCategory = async  (req, res) => {
  try {
    const userId = req.user.userId;
    const id = req.params.id;
    const category = await categoryService.deleteCategory(userId, id);
    res.status(200).json(category);
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message || "category delete failed!" });
  }
}