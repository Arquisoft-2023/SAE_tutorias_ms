import { Response } from 'express';

const handleHttp = (res: Response, error: any, errorRaw?: any) => {
    
    console.log(errorRaw);
    res.status(error.status);
    res.send({ description: error.msg, status: error.status });
};

export { handleHttp };