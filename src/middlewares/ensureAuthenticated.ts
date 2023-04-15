import { Request, Response, NextFunction, response } from "express";
import { verify } from "jsonwebtoken";

export function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {
  const authToken = request.headers.authorization;

  if (! authToken) {
    return response.status(401).json({
      message: "Token is missing"
    }) ;
  }

  const [, token] = authToken.split(' ');
  
  try {
    verify(token, 'a9bb935c-1080-44e8-8bd7-96ee5290f4a9');

    return next();
  } catch(err) {
    return response.status(401).json({
      message: 'Token invalid',
    });
  }
}