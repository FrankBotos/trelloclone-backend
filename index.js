require("dotenv").config();
const express = require("express");
const cors = require("cors");
const KanbanBoard = require("./config");
const app = express();
app.use(express.json());
app.use(cors());

//get ALL kanbans
app.get("/", async (req, res) => {
  const snapshot = await KanbanBoard.get();
  const list = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  res.send(list);
});

//create new kanban board
app.post("/create", async (req, res) => {
  const data = req.body;
  await KanbanBoard.add({ data });
  res.send({ msg: "KanbanBoard Successfully Added" });
});

//update full existing kanban board
app.post("/update", async (req, res) => {
  const id = req.body.id;
  delete req.body.id;
  const data = req.body;
  await KanbanBoard.doc(id).update(data);
  res.send({ msg: "Updated" });
});

//update columns object in a given kanban board, found by id
app.post("/updatecols", async (req, res) => {
  const id = req.body.id;
  const columns = req.body.columns;
  await KanbanBoard.doc(id).update({
    "data.columns": columns,
  });
  res.send({ msg: "Columns Updated" });
});

//update kanban title
app.post("/updatetitle", async (req, res) => {
  const id = req.body.id;
  const title = req.body.title;
  await KanbanBoard.doc(id).update({
    "data.title": title,
  });
  res.send({ msg: "Title Updated" });
});

//delete kanban board
app.post("/delete", async (req, res) => {
  const id = req.body.id;
  await KanbanBoard.doc(id).delete();
  res.send({ msg: "Deleted" });
});
app.listen(4000, () => console.log("Up & RUnning *4000"));
