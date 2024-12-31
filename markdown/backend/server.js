import express from "express";
import { connectDB } from "./db/db.js";
import { Note } from "./models/note.model.js";
import cors from "cors";

const app = express();
app.use(cors());
const database = connectDB();

const port = 3000;

app.use(express.json());

app.get("/markdown", (req, res) => {
  Note.find()
    .then((notes) => {
      res.json(notes);
    })
    .catch((err) => res.json(err));
});

app.post("/markdown", (req, res) => {
  Note.create(req.body)
    .then((note) => res.json(note))
    .catch((err) => res.json(err));
});

app.put("/markdown/:nid", (req, res) => {
  Note.findOneAndUpdate({ _id: req.params.nid },
    { $push: { pages: req.body } },
    { new: true }
  )
    .then((note) => res.json(note))
    .catch((err) => res.json(err));
}
);

app.patch("/markdown/:nid/:pid", (req, res) => {
  Note.findOneAndUpdate(
    { _id: req.params.nid, "pages._id": req.params.pid },
    {
      $set: {
        "pages.$.content": req.body.content,
        "pages.$.title": req.body.title,
      },
    },
    { new: true }
  )
    .then((note) => res.json(note))
    .catch((err) => res.json(err));
});

app.delete("/markdown/:nid/:pid", (req, res) => {
  Note.findOneAndDelete({ _id: req.params.nid, "pages._id": req.params.pid })
    .then((note) => res.json(note))
    .catch((err) => res.json(err));
});

// app.delete("/markdown/:nid", (req, res) => {
//   Note.findOneAndDelete({ _id: req.params.nid })
//     .then((note) => res.json(note))
//     .catch((err) => res.json(err));
// });

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
