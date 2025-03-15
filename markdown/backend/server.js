import 'dotenv/config'
import express from "express";
import { connectDB } from "./db/db.js";
import { Note } from "./models/note.model.js";
import cors from "cors";
import { auth } from "express-oauth2-jwt-bearer";
import jwksRsa from "jwks-rsa";
import jwt from "express-jwt";


const app = express();
app.use(cors());
app.use(express.json());
const database = connectDB();

const port = process.env.PORT || 3000;

// Authorization middleware. When used, the Access Token must
// exist and be verified against the Auth0 JSON Web Key Set.

const jwtCheck = auth({
  audience: process.env.AUTH0_AUDIENCE,
  issuerBaseURL: process.env.AUTH0_ISSUER_URL,
  tokenSigningAlg: process.env.AUTH0_ALGORITHM,
});

app.get("/", (req, res) => {
  console.log("Starting server...");
  res.send("Server started....")
})

app.get("/markdown", jwtCheck, (req, res) => {
  console.log("Decoded JWT:", req.auth.payload.sub);
  Note.find({ authorId: req.auth.payload.sub })
    .then((notes) => {
      res.json(notes);
    })
    .catch((err) => res.json(err));
});

app.post("/markdown", (req, res) => {
  const newnote = req.body;

  Note.create(newnote)
    .then((note) => res.json(note))
    .catch((err) => res.json(err));
});

app.put("/markdown/:nid", (req, res) => {
  Note.findOneAndUpdate(
    { _id: req.params.nid },
    { $push: { pages: req.body } },
    { new: true }
  )
    .then((note) => res.json(note))
    .catch((err) => res.json(err));
});

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

app.patch("/markdown/:nid/:pid/:newtitle", (req, res) => {
  Note.findOneAndUpdate(
    { _id: req.params.nid, "pages._id": req.params.pid },
    { $set: { "pages.$.title": req.params.newtitle } },
    { new: true }
  )
    .then((note) => res.json(note))
    .catch((err) => res.json(err));
});

app.patch("/markdown/:nid", (req, res) => {
  Note.findOneAndUpdate(
    { _id: req.params.nid },
    { $set: { title: req.body.title } },
    { new: true }
  )
    .then((note) => res.json(note))
    .catch((err) => res.json(err));
});

app.delete("/markdown/:nid/:pid", (req, res) => {
  Note.findOneAndUpdate(
    { _id: req.params.nid },
    { $pull: { pages: { _id: req.params.pid } } }
  )
    .then((note) => res.json(note))
    .catch((err) => res.json(err));
});

app.delete("/markdown/:nid", (req, res) => {
  Note.findOneAndDelete({ _id: req.params.nid })
    .then((note) => res.json(note))
    .catch((err) => res.json(err));
});


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

// export default app;