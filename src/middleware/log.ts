import {NextFunction, Request, Response} from "express";

//Con ello con el token podemos verificar los permisos de usuarios
const logMiddleware = (_req: Request, _res: Response, next: NextFunction) => {
    //const header = req.headers; 
    //const userAgent = header["user-agent"];
    next();
};

export {logMiddleware};