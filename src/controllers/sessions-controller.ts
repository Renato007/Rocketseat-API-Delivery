import { Request, Response, NextFunction } from "express";

class SessionsController {
  create(request: Request, response: Response, next: NextFunction) {
    return response.json({ message: "ok" });
  }
}

export { SessionsController };
