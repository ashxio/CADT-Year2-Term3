import { articles } from "../models/data";
let nextId = articles.length + 1;
// get all articles
function getAllArticles(req, res) {
  res.json(articles);
}
// get article by id
function getArticleById(req, res) {
  const id = Number(req.params.id);
  const article = articles.find((a) => a.id === id);
  if (!article) {
    return res.status(404).json({ error: "Article not found" });
  }
  res.json(article);
}
// create new article
function createArticle(req, res) {
  const { title, content, journalistId, categoryId } = req.body;
  if (!title || !content || !journalistId || !categoryId) {
    return res.status(400).json({
      error: "title, content, journalistId, and categoryId are required",
    });
  }
  const newArticle = {
    id: nextId++,
    title,
    content,
    journalistId,
    categoryId,
  };
  articles.push(newArticle);
  res.status(201).json(newArticle);
}
// update article by id
function updateArticle(req, res) {
  const id = Number(req.params.id);
  const article = articles.find((a) => a.id === id);
  if (!article) {
    return res.status(404).json({ error: "Article not found" });
  }
  const { title, content, journalistId, categoryId } = req.body;
  if (title !== undefined) article.title = title;
  if (content !== undefined) article.content = content;
  if (journalistId !== undefined) article.journalistId = journalistId;
  if (categoryId !== undefined) article.categoryId = categoryId;
  res.json(article);
}
// delete article by id
function deleteArticle(req, res) {
  const id = Number(req.params.id);
  const index = articles.findIndex((a) => a.id === id);
  if (index === -1) {
    return res.status(404).json({ error: "Article not found" });
  }
  articles.splice(index, 1);
  res.sendStatus(204);
}
// export controller func
export {
  getAllArticles,
  getArticleById,
  createArticle,
  updateArticle,
  deleteArticle,
};