import "dotenv/config";
import { lerFaturas } from "./export/export";
import { GetFaturasFilter } from "./types/GetFaturasFilter";
import createExpress from "./config/createExpress";
import { FaturaData } from "./types/FaturaData";
import getDateGroup from "./utils/getFaturaGroup";
import createDeepGroup from "./utils/createDeepGroup";

const app = createExpress();

app.post("/faturas", (req, res) => {
  const filtros: GetFaturasFilter = req.body;

  let faturas: FaturaData[] = lerFaturas();

  if (filtros.startDate) {
    filtros.startDate.setHours(0, 0, 0);
    faturas = faturas.filter((f) => f.date >= filtros.startDate);
  }

  if (filtros.endDate) {
    filtros.endDate.setHours(24, 0, 0);
    faturas = faturas.filter((f) => f.date < filtros.endDate);
  }

  if (filtros.titleSearch) {
    const lowTitle = filtros.titleSearch.toLowerCase();
    faturas = faturas.filter((f) => f.title.toLowerCase().includes(lowTitle));
  }

  if (filtros.dateGroup) {
    faturas = createDeepGroup(faturas, (f) => getDateGroup(f.date, filtros.dateGroup));
  }

  if (filtros.groupByTitle) {
    faturas = createDeepGroup(faturas, (f) => f.title);
  }

  res.send(faturas);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.info(`Servidor rodando na porta ${PORT}`));
