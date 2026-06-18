import { useEffect, useState } from "react";
import axios from "axios";

const API_BASE = "http://localhost:5000";

export default function ArticleFilter() {
  const [articles, setArticles] = useState([]);
  const [journalists, setJournalists] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedJournalistId, setSelectedJournalistId] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchJournalists();
    fetchCategories();
  }, []);

  const fetchArticles = async (url = "/articles", params = {}) => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.get(`${API_BASE}${url}`, { params });
      setArticles(response.data);
    } catch (err) {
      setError("Failed to load articles. Check the backend and try again.");
    } finally {
      setLoading(false);
    }
  };

  const fetchJournalists = async () => {
    try {
      const response = await axios.get(`${API_BASE}/journalists`);
      setJournalists(response.data);
    } catch (err) {
      console.error(err);
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
    if (selectedJournalistId && selectedCategoryId) {
      try {
        await fetchArticles("/articles", {
          journalistId: selectedJournalistId,
          categoryId: selectedCategoryId,
        });
      } catch (err) {
        // If backend doesn't support combined query parameters, fallback to nested route then client-side filter
        const response = await axios.get(
          `${API_BASE}/journalists/${selectedJournalistId}/articles`
        );
        setArticles(
          response.data.filter(
            (article) => String(article.categoryId) === selectedCategoryId
          )
        );
      }
      return;
    }

    if (selectedJournalistId) {
      await fetchArticles(`/journalists/${selectedJournalistId}/articles`);
      return;
    }

    if (selectedCategoryId) {
      await fetchArticles(`/categories/${selectedCategoryId}/articles`);
      return;
    }

    await fetchArticles();
  };

  const handleResetFilters = () => {
    setSelectedJournalistId("");
    setSelectedCategoryId("");
    fetchArticles();
  };

  const getJournalistName = (id) => {
    const journalist = journalists.find((item) => item.id === id || String(item.id) === String(id));
    return journalist ? journalist.name || `Journalist #${id}` : `Journalist #${id}`;
  };

  const getCategoryName = (id) => {
    const category = categories.find((item) => item.id === id || String(item.id) === String(id));
    return category ? category.name || `Category #${id}` : `Category #${id}`;
  };

  return (
    <div>
      <h2>Articles</h2>
      <div style={{ marginBottom: "20px", display: "flex", gap: "10px", flexWrap: "wrap" }}>
        <label htmlFor="journalistFilter">Filter by Journalist:</label>
        <select
          id="journalistFilter"
          value={selectedJournalistId}
          onChange={(e) => setSelectedJournalistId(e.target.value)}
        >
          <option value="">All Journalists</option>
          {journalists.map((journalist) => (
            <option key={journalist.id} value={journalist.id}>
              {journalist.name || `Journalist #${journalist.id}`}
            </option>
          ))}
        </select>

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
      {error && <p style={{ color: "red" }}>{error}</p>}

      <ul>
        {articles.map((article) => (
          <li key={article.id} style={{ marginBottom: "16px" }}>
            <strong>{article.title}</strong>
            <br />
            <small>
              By {getJournalistName(article.journalistId)} | Category {getCategoryName(article.categoryId)}
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
