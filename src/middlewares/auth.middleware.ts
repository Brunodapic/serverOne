import { NextFunction, Response } from "express";
import { HttpException } from "node-exceptions";

const authMiddleware = async (req: any, res: Response, next: NextFunction) => {
  try {
    console.log(req.header("Authorization"));

    const Authorization =
      (req.header("Authorization")
        ? req.header("Authorization").split("Bearer ")[1]
        : null);

    if (Authorization) {
      console.log(Authorization);
    } else {
      next(new HttpException("Authentication token missing", 404));
    }
    next();
  } catch (error) {
    console.log(error.message);
    next(new HttpException("Wrong authentication token, bro", 401));
  }
};

export default authMiddleware;
