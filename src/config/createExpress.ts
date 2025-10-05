import "dotenv/config";
import express from "express";
import cors from "cors";

// Função recursiva para converter strings de data
function convertDates(obj: object): void {
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const value = obj[key];

      // Se for string que parece uma data, converte para Date
      if (typeof value === "string" && isDateString(value)) {
        obj[key] = new Date(value);
      }
      // Se for objeto, chama recursivamente
      else if (typeof value === "object" && value !== null) {
        convertDates(value);
      }
    }
  }
}

// Função para verificar se a string parece ser uma data
function isDateString(value: string): boolean {
  const datePatterns = [
    /^\d{4}-\d{2}-\d{2}$/, // YYYY-MM-DD
    /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/, // ISO string
    /^\d{2}\/\d{2}\/\d{4}$/, // DD/MM/YYYY
    /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/, // YYYY-MM-DD HH:MM:SS
  ];

  return datePatterns.some((pattern) => pattern.test(value)) && !isNaN(Date.parse(value));
}

function createExpress() {
  const app = express();

  app.use(cors());

  app.use(express.json());

  app.use((req, _, next) => {
    if (req.body && typeof req.body === "object") {
      convertDates(req.body);
    }
    next();
  });

  return app;
}

export default createExpress;
