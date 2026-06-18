import express from "express";

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server is running");
});

//logger middleware
function logger(req, res, next) {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
}
app.use(logger);

// In-memory user store
let users = [
  { id: 1, name: "Alice Johnson", email: "alice.johnson@example.com" },
  { id: 2, name: "Bob Smith", email: "bob.smith@example.com" },
  { id: 3, name: "Charlie Lee", email: "charlie.lee@example.com" },
  { id: 4, name: "Diana Prince", email: "diana.prince@example.com" },
  { id: 5, name: "Ethan Brown", email: "ethan.brown@example.com" },
  { id: 6, name: "Fiona Garcia", email: "fiona.garcia@example.com" },
  { id: 7, name: "George King", email: "george.king@example.com" },
  { id: 8, name: "Hannah White", email: "hannah.white@example.com" },
  { id: 9, name: "Ian Black", email: "ian.black@example.com" },
  { id: 10, name: "Jane Miller", email: "jane.miller@example.com" },
  { id: 11, name: "Kyle Green", email: "kyle.green@example.com" },
  { id: 12, name: "Laura Adams", email: "laura.adams@example.com" },
  { id: 13, name: "Mike Davis", email: "mike.davis@example.com" },
  { id: 14, name: "Nina Torres", email: "nina.torres@example.com" },
  { id: 15, name: "Oscar Young", email: "oscar.young@example.com" },
  { id: 16, name: "Paula Scott", email: "paula.scott@example.com" },
  { id: 17, name: "Quentin Wright", email: "quentin.wright@example.com" },
  { id: 18, name: "Rachel Hall", email: "rachel.hall@example.com" },
  { id: 19, name: "Steve Baker", email: "steve.baker@example.com" },
  { id: 20, name: "Tina Morgan", email: "tina.morgan@example.com" },
];
let nextId = users.length + 1;

// get all user
app.get("/users", (req, res) => {
  res.json(users);
});
// get user by id
app.get("/users/:id", (req, res) => {
  const id = Number(req.params.id);
  const user = users.find((u) => u.id === id);
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }
  res.json(user);
});
// create a new user
app.post("/users", (req, res) => {
  const { name, email } = req.body;
  if (!name || !email) {
    return res.status(400).json({ error: "Name and email are required" });
  }
  const newUser = {
    id: nextId++,
    name,
    email,
  };

  users.push(newUser);
  res.status(201).json(newUser);
});
// update a user
app.put("/users/:id", (req, res) => {
  const id = Number(req.params.id);
  const user = users.find((u) => u.id === id);
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }
  const { name, email } = req.body;
  if (name !== undefined) user.name = name;
  if (email !== undefined) user.email = email;
  res.json(user);
});
// delete a user
app.delete("/users/:id", (req, res) => {
  const id = Number(req.params.id);
  const index = users.findIndex((u) => u.id === id);
  if (index === -1) {
    return res.status(404).json({ error: "User not found" });
  }
  users.splice(index, 1);
  res.sendStatus(204);
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
