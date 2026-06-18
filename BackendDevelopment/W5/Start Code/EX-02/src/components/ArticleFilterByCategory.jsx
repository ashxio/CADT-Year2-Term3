import { useEffect, useState } from 'react';
import axios from 'axios';

const API_BASE = 'http://localhost:5000';

export default function ArticleFilterByCategory() {
  const [articles, setArticles] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchCategories();
    fetchArticles();
  }, []);

  const fetchArticles = async (url = '/articles') => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.get(`${API_BASE}${url}`);
      setArticles(response.data);
    } catch (err) {
      setError('Failed to load articles.');
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${API_BASE}/categories`);
      setCategories(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleApplyFilters = async () => {
    if (selectedCategoryId) {
      await fetchArticles(`/categories/${selectedCategoryId}/articles`);
      return;
    }
    await fetchArticles();
  };

  const handleResetFilters = () => {
    setSelectedCategoryId('');
    fetchArticles();
  };

  return (
    <div>
      <h2>Articles</h2>
      <div style={{ marginBottom: '20px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
        <label htmlFor="categoryFilter">Filter by Category:</label>
        <select
          id="categoryFilter"
          value={selectedCategoryId}
          onChange={(e) => setSelectedCategoryId(e.target.value)}
        >
          <option value="">All Categories</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name || `Category #${category.id}`}
            </option>
          ))}
        </select>

        <button onClick={handleApplyFilters}>Apply Filters</button>
        <button onClick={handleResetFilters}>Reset Filters</button>
      </div>

      {loading && <p>Loading articles...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <ul>
        {articles.map((article) => (
          <li key={article.id} style={{ marginBottom: '16px' }}>
            <strong>{article.title}</strong>
            <br />
            <small>
              By Journalist #{article.journalistId} | Category #{article.categoryId}
            </small>
            <br />
            <button disabled>Delete</button>
            <button disabled>Update</button>
            <button disabled>View</button>
          </li>
        ))}
      </ul>
    </div>
  );
}