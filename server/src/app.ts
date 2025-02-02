import Express from "express";
import * as bodyParser from "body-parser";
import cors from "cors";
import routes from "./routes";

class App {
  public app: Express.Application;

  constructor() {
    this.app = Express();
    this.config();
  }

  private config() {
    this.app.use(cors());
    this.app.use(bodyParser.json());
    this.app.use(routes);
  }
}

export default new App().app;
