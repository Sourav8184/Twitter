import express from "express";

const app = express();
const PORT = 8000;

app.get("/", (req, res) => {
  res.json({ Home: "HomePage" });
});

app.listen(PORT, () => {
  console.log(`Server start at PORT: ${PORT}`);
});
