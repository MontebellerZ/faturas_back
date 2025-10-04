import "dotenv/config";
import express from "express";
import { lerFaturas } from "./export/export";

const app = express();

app.get("/faturas", (req, res) => {
  const faturas = lerFaturas();
  res.send(faturas);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
