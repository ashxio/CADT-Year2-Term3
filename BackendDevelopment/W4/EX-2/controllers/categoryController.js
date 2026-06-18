import { categories } from "../models/data.js";
let nextId = categories.length + 1;
// get all category
function getAllCategories(req, res) {
  res.json(categories);
}
// get category by id
function getCategoryById(req, res) {
  const id = Number(req.params.id);
  const category = categories.find((c) => c.id === id);
  if (!category) {
    return res.status(404).json({ error: "Category not found" });
  }
  res.json(category);
}
// create new category
function createCategory(req, res) {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ error: "Name is required" });
  }
  const newCategory = {
    id: nextId++,
    name,
  };
  categories.push(newCategory);
  res.status(201).json(newCategory);
}
// update category by id
function updateCategory(req, res) {
  const id = Number(req.params.id);
  const category = categories.find((c) => c.id === id);
  if (!category) {
    return res.status(404).json({ error: "Category not found" });
  }
  const { name } = req.body;
  if (name !== undefined) category.name = name;
  res.json(category);
}
// delete category by id
function deleteCategory(req, res) {
  const id = Number(req.params.id);
  const index = categories.findIndex((c) => c.id === id);
  if (index === -1) {
    return res.status(404).json({ error: "Category not found" });
  }
  categories.splice(index, 1);
  res.sendStatus(204);
}
// export controller func
export {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
};
