import "express-async-errors";
import express, { Request, Response, NextFunction } from "express";

import { router } from "./routes";

const app = express()
const port = 3000

app.use(express.json());
app.use(router);

app.use((error: Error, request: Request, response: Response, next: NextFunction) => {
  return response.json({
    status: "Error",
    message: error.message
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})