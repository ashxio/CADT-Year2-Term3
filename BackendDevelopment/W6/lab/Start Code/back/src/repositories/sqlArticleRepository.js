import { pool } from "../utils/database.js";

async function resolveJournalistId(journalistValue) {
  if (journalistValue === undefined || journalistValue === null) {
    return null;
  }

  const value = String(journalistValue).trim();
  if (value === "") {
    return null;
  }

  const numericId = Number(value);
  if (Number.isInteger(numericId) && numericId > 0) {
    const [rows] = await pool.query(
      "SELECT id FROM journalists WHERE id = ? LIMIT 1",
      [numericId]
    );
    if (rows.length > 0) {
      return numericId;
    }
  }

  const [rows] = await pool.query(
    "SELECT id FROM journalists WHERE name = ? LIMIT 1",
    [value]
  );
  if (rows.length > 0) {
    return rows[0].id;
  }

  const [result] = await pool.query(
    "INSERT INTO journalists (name) VALUES (?)",
    [value]
  );
  return result.insertId;
}

async function resolveCategoryId(categoryValue) {
  if (categoryValue === undefined || categoryValue === null) {
    return null;
  }

  const value = String(categoryValue).trim();
  if (value === "") {
    return null;
  }

  const numericId = Number(value);
  if (Number.isInteger(numericId) && numericId > 0) {
    const [rows] = await pool.query(
      "SELECT id FROM category WHERE id = ? LIMIT 1",
      [numericId]
    );
    if (rows.length > 0) {
      return numericId;
    }
  }

  const [rows] = await pool.query(
    "SELECT id FROM category WHERE name = ? LIMIT 1",
    [value]
  );
  if (rows.length > 0) {
    return rows[0].id;
  }

  const [result] = await pool.query(
    "INSERT INTO category (name) VALUES (?)",
    [value]
  );
  return result.insertId;
}

export async function getArticles() {
  const [rows] = await pool.query(
    `SELECT a.id, a.title, a.content, a.journalist_id, j.name AS journalist,
            GROUP_CONCAT(c.name SEPARATOR ', ') AS category
     FROM articles a
     LEFT JOIN journalists j ON a.journalist_id = j.id
     LEFT JOIN article_category ac ON a.id = ac.article_id
     LEFT JOIN category c ON ac.category_id = c.id
     GROUP BY a.id
     ORDER BY a.id`
  );
  return rows;
}

export async function getArticleById(id) {
  const [rows] = await pool.query(
    `SELECT a.id, a.title, a.content, a.journalist_id, j.name AS journalist,
            GROUP_CONCAT(c.name SEPARATOR ', ') AS category
     FROM articles a
     LEFT JOIN journalists j ON a.journalist_id = j.id
     LEFT JOIN article_category ac ON a.id = ac.article_id
     LEFT JOIN category c ON ac.category_id = c.id
     WHERE a.id = ?
     GROUP BY a.id`,
    [id]
  );
  return rows.length > 0 ? rows[0] : null;
}

export async function createArticle(article) {
  const journalistId = await resolveJournalistId(article.journalist ?? article.journalistId);
  const categoryId = await resolveCategoryId(article.category ?? article.categoryId);
  
  const [result] = await pool.query(
    "INSERT INTO articles (title, content, journalist_id) VALUES (?, ?, ?)",
    [article.title, article.content, journalistId]
  );
  
  if (categoryId) {
    await pool.query(
      "INSERT INTO article_category (article_id, category_id) VALUES (?, ?)",
      [result.insertId, categoryId]
    );
  }
  
  return getArticleById(result.insertId);
}

export async function updateArticle(id, updatedData) {
  const journalistId = await resolveJournalistId(updatedData.journalist ?? updatedData.journalistId);
  const categoryId = await resolveCategoryId(updatedData.category ?? updatedData.categoryId);
  
  const [result] = await pool.query(
    "UPDATE articles SET title = ?, content = ?, journalist_id = ? WHERE id = ?",
    [updatedData.title, updatedData.content, journalistId, id]
  );
  
  if (result.affectedRows === 0) {
    return null;
  }
  
  if (categoryId) {
    await pool.query("DELETE FROM article_category WHERE article_id = ?", [id]);
    await pool.query(
      "INSERT INTO article_category (article_id, category_id) VALUES (?, ?)",
      [id, categoryId]
    );
  }
  
  return getArticleById(id);
}

export async function deleteArticle(id) {
  await pool.query("DELETE FROM article_category WHERE article_id = ?", [id]);
  const [result] = await pool.query("DELETE FROM articles WHERE id = ?", [id]);
  return result.affectedRows > 0;
}
