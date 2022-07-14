/* example kanban board for reference
{
    "uid": 1231414124,
    "title": "My Kanban Board",
    "archived": false,
    "columns": {
      "123123": {
        "name": "To Do",
        "items": [
          {"id":1234, "content":"task1", "due": null},
          {"id":4312, "content":"task2", "due": null}
          ]
      },
      "213124": {
        "name": "Doing",
        "items": [
          {"id":1234, "content":"task2", "due": null},
          {"id":4312, "content":"task3", "due": null}
          ]
      }
    }
}
*/


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

//update existing kanban board
app.post("/update", async (req, res) => {
  const id = req.body.id;
  delete req.body.id;
  const data = req.body;
  await KanbanBoard.doc(id).update(data);
  res.send({ msg: "Updated" });
});

//delete kanban board
app.post("/delete", async (req, res) => {
  const id = req.body.id;
  await KanbanBoard.doc(id).delete();
  res.send({ msg: "Deleted" });
});
app.listen(4000, () => console.log("Up & RUnning *4000"));