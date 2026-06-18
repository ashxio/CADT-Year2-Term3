import * as sqlarticleRepository from "../repositories/sqlArticleRepository.js";

export async function getAllArticles(req, res) {
  try {
    const articles = await sqlarticleRepository.getArticles();
    res.json(articles);
  } catch (error) {
    console.error("Error fetching articles:", error);
    res.status(500).json({ message: "Server error" });
  }
}

export async function getArticleById(req, res) {
  try {
    const article = await sqlarticleRepository.getArticleById(req.params.id);
    if (!article) {
      return res.status(404).json({ message: "Article not found" });
    }
    res.json(article);
  } catch (error) {
    console.error("Error fetching article:", error);
    res.status(500).json({ message: "Server error" });
  }
}

export async function createArticle(req, res) {
  try {
    const newArticle = await sqlarticleRepository.createArticle(req.body);
    res.status(201).json(newArticle);
  } catch (error) {
    console.error("Error creating article:", error);
    res.status(500).json({ message: "Server error" });
  }
}

export async function updateArticle(req, res) {
  try {
    const updatedArticle = await sqlarticleRepository.updateArticle(
      req.params.id,
      req.body
    );
    if (!updatedArticle) {
      return res.status(404).json({ message: "Article not found" });
    }
    res.json(updatedArticle);
  } catch (error) {
    console.error("Error updating article:", error);
    res.status(500).json({ message: "Server error" });
  }
}

export async function deleteArticle(req, res) {
  try {
    const deleted = await sqlarticleRepository.deleteArticle(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "Article not found" });
    }
    res.status(204).send();
  } catch (error) {
    console.error("Error deleting article:", error);
    res.status(500).json({ message: "Server error" });
  }
}
// GET /api/articles/journalist/:id
export async function getArticlesByJournalist(req, res) {
  try {
    const articles = await sqlarticleRepository.getArticlesByJournalistId(
      req.params.id
    );
    res.json(articles);
  } catch (error) {
    console.error("Error fetching articles by journalist:", error);
    res.status(500).json({ message: "Server error" });
  }
}

export async function getJournalistById(req, res) {
  try {
    const journalist = await sqlarticleRepository.getJournalistById(req.params.id);
    if (!journalist) {
      return res.status(404).json({ message: "Journalist not found" });
    }
    res.json(journalist);
  } catch (error) {
    console.error("Error fetching journalist:", error);
    res.status(500).json({ message: "Server error" });
  }
}

export async function getCategories(req, res) {
  try {
    const categories = await sqlarticleRepository.getCategories();
    res.json(categories);
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).json({ message: "Server error" });
  }
}

export async function getArticlesByCategory(req, res) {
  try {
    const articles = await sqlarticleRepository.getArticlesByCategoryId(
      req.params.id
    );
    res.json(articles);
  } catch (error) {
    console.error("Error fetching articles by category:", error);
    res.status(500).json({ message: "Server error" });
  }
}