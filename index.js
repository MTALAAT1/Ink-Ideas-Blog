import express from "express";
const app = express();
const port = 3000;
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

const posts = [];

app.get("/create", (req, res) => {
  res.render("create.ejs", {});
});

app.post("/edit", (req, res) => {
  const index = Number(req.body.postIndexForEdit);
  const post = posts[index];

  res.render("edit.ejs", {
    post: post,
    index: index,
  });
});

app.post("/edit/save", (req, res) => {
  const index = Number(req.body.postIndexForSaving);
  posts[index].title = req.body.Title;
  posts[index].body = req.body.Body;
  posts[index].date = new Date();
  res.redirect("/");
});

app.post("/delete", (req, res) => {
  const index = Number(req.body.postIndex);
  posts.splice(index, 1);
  res.redirect("/");
});

app.post("/create", (req, res) => {
  const title = req.body.Title;
  const body = req.body.Body;
  const date = new Date();
  const post = {
    title: title,
    body: body,
    date:date
  };
  posts.push(post);
  console.log(post.title);
  console.log(post.body);
  res.redirect("/");
});

app.get("/", (req, res) => {
  res.render("index.ejs", {
    posts: posts,
  });
});

app.listen(port, () => {
  console.log(` the app running on port ${port} successfully`);
});
