import 'dotenv/config';
import express from 'express';
const app = express();

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.listen(PORT, () => {
  console.log(`Server Is Running On Port : ${PORT}`);
});