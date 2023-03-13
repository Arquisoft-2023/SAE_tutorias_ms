import "dotenv/config";
import express from 'express';
import cors from 'cors';
import {router} from './routes/Index';
import db from './config/Mongo';

const PORT = process.env.PORT || 3001;
const URI = process.env.URI || 'http://127.0.0.1';

const app = express();

app.use(cors({
    origin: [`${URI}:${PORT}/`]  // Especificar el dominio de las rutas
}));
app.use(express.json()); // middleware que transforma la req.body a un json
app.use(router);

db().then(()=> console.log('Data base ready'));

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
});
