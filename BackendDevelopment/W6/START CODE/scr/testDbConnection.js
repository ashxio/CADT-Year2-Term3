import { pool } from "./db/database.js";
  
async function testConnection() {
  try {
    // TODO  - Use the pool to query the database (SHOW TABLES query)
    const [tables] = await pool.query("show tables");

    // TODO - Print the list of tables in the console
    console.log("Tables in the database:", tables);
    // or using forEach
    tables.forEach ((table) => {
      console.log(table.Tables_in_test_database)
    });

     
  } catch (err) {
    console.error("Failed to connect to the database:", err.message);
  } finally {
    process.exit();
  }
}

testConnection();
