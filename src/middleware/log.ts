import {NextFunction, Request, Response} from "express";

//Con ello con el token podemos verificar los permisos de usuarios
const logMiddleware = (req: Request, _res: Response, next: NextFunction) => {
    const header = req.headers; 
    const userAgent = header["user-agent"];
    console.log("user-agent", userAgent);
    next();
};

export {logMiddleware};