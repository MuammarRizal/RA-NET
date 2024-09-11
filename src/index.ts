import express, { Application, NextFunction, Request, Response } from "express";

const app: Application = express();
const PORT: Number = 4000;

app.use("/", (req: Request, res: Response, next: NextFunction) => {
  res.status(200).send({ data: "Jange" });
});

app.listen(PORT, () => {
  console.log(`Server is listening at port : ${PORT}`);
});
