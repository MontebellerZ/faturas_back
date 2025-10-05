import "dotenv/config";
import { lerFaturas } from "./export/export";
import { GetFaturasFilter } from "./types/GetFaturasFilter";
import createExpress from "./config/createExpress";

const app = createExpress();

app.post("/faturas", (req, res) => {
  const body: GetFaturasFilter = req.body;

  const faturas = lerFaturas();
  res.send(faturas);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
