import express, { Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();
app.use(cors()); 

const apiKey = process.env.API_KEY;

app.get("/weather", async (req: Request, res: Response) => {
  const city = req.query.city as string;

  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=pt_br`
  );

  const data = await response.json();
  res.json(data);
});

app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});