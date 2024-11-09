import express, { NextFunction, Request, Response } from "express";
import { postHandler } from "lambdas/api-handlers/gym-handler";
import { createContext, mapRequest, mapResponse } from "./aws-mapping";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/gym", (req: Request, res: Response, _next: NextFunction) => {
  const request = mapRequest(req);
  const callback = mapResponse(res);
  const context = createContext(req);
  postHandler(request, context, callback);
});

// Start the server
const port = Number(3000);
app.listen(port, () => {
  console.log("Express server started on port: " + port);
});
