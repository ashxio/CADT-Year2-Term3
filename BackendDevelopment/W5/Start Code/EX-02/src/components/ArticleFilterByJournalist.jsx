import { useEffect, useState } from 'react';
import axios from 'axios';

const API_BASE = 'http://localhost:5000';

export default function ArticleFilterByJournalist() {
  const [articles, setArticles] = useState([]);
  const [journalists, setJournalists] = useState([]);
  const [selectedJournalistId, setSelectedJournalistId] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchJournalists();
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

  const fetchJournalists = async () => {
    try {
      const response = await axios.get(`${API_BASE}/journalists`);
      setJournalists(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleApplyFilters = async () => {
    if (selectedJournalistId) {
      await fetchArticles(`/journalists/${selectedJournalistId}/articles`);
      return;
    }
    await fetchArticles();
  };

  const handleResetFilters = () => {
    setSelectedJournalistId('');
    fetchArticles();
  };

  return (
    <div>
      <h2>Articles</h2>
      <div style={{ marginBottom: '20px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
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