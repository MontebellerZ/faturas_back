import "dotenv/config";
import fs from "fs";
import xlsx from "xlsx";
import path from "path";
import { FaturaData } from "../types/FaturaData";

const TIMEZONE_OFFSET = new Date().getTimezoneOffset() / 60;

export function lerFaturas() {
  const folder = process.env.FATURAS_PATH;

  if (!folder) throw new Error("Caminho das faturas não informado");
  if (!fs.existsSync(folder)) throw new Error("Diretório de faturas não encontrado");

  const files = fs.readdirSync(folder);

  const faturas = files.flatMap((file) => {
    const filepath = path.join(folder, file);

    const wb = xlsx.readFile(filepath, {
      cellDates: true,
      codepage: 65001, // UTF-8
    });

    const ws = wb.Sheets[wb.SheetNames[0]];

    const data: FaturaData[] = xlsx.utils.sheet_to_json(ws);

    data.forEach((d) => d.date.setHours(d.date.getHours() + TIMEZONE_OFFSET));

    return data;
  });

  return faturas;
}

export function salvarFaturas(faturas: FaturaData[]) {
  const faturaPath = process.env.FATURA_JSON;

  fs.writeFileSync(faturaPath, JSON.stringify(faturas, null, 2));
}
