const dotenv = require('dotenv');
dotenv.config();
const mysql = require('mysql2/promise');
(async () => {
  try {
    const pool = await mysql.createPool({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });
    const [tables] = await pool.query('SHOW TABLES');
    console.log('TABLES:', tables.map(r => Object.values(r)[0]));
    const [desc] = await pool.query('DESCRIBE articles');
    console.log('ARTICLES DESC:', JSON.stringify(desc, null, 2));
    const [sample] = await pool.query('SELECT * FROM articles LIMIT 5');
    console.log('SAMPLE:', JSON.stringify(sample, null, 2));
    const [catDesc] = await pool.query('DESCRIBE category').catch(e => [{ error: e.message }]);
    console.log('CATEGORY DESC:', JSON.stringify(catDesc, null, 2));
    const [articleCatDesc] = await pool.query('DESCRIBE article_category').catch(e => [{ error: e.message }]);
    console.log('ARTICLE_CATEGORY DESC:', JSON.stringify(articleCatDesc, null, 2));
    await pool.end();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();
