import { journalists } from "../models/data.js";
let nextId = journalists.length + 1;
// get all journalists
function getAllJournalists(req, res) {
  res.json(journalists);
}
// get journalist by id
function getJournalistById(req, res) {
  const id = Number(req.params.id);
  const journalist = journalists.find((j) => j.id === id);
  if (!journalist) {
    return res.status(404).json({ error: "Journalist not found" });
  }
  res.json(journalist);
}
// create new journalist
function createJournalist(req, res) {
  const { name, email } = req.body;
  if (!name || !email) {
    return res.status(400).json({ error: "Name and email are required" });
  }
  const newJournalist = {
    id: nextId++,
    name,
    email,
  };
  journalists.push(newJournalist);
  res.status(201).json(newJournalist);
}
//update journalist by id
function updateJournalist(req, res) {
  const id = Number(req.params.id);
  const journalist = journalists.find((j) => j.id === id);
  if (!journalist) {
    return res.status(404).json({ error: "Journalist not found" });
  }
  const { name, email } = req.body;
  if (name !== undefined) journalist.name = name;
  if (email !== undefined) journalist.email = email;
  res.json(journalist);
}
// delete journalist by id
function deleteJournalist(req, res) {
  const id = Number(req.params.id);
  const index = journalists.findIndex((j) => j.id === id);
  if (index === -1) {
    return res.status(404).json({ error: "Journalist not found" });
  }
  journalists.splice(index, 1);
  res.sendStatus(204);
}
// export all func
export {
  getAllJournalists,
  getJournalistById,
  createJournalist,
  updateJournalist,
  deleteJournalist,
};
