import 'dotenv/config';
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import { connectToDb } from './config/db.js';
import prospectRoutes from './routes/prospects.routes.js';

const app = express();

app.use(helmet());
const corsOptions = {
    origin: [process.env.ORIGIN_CORS],
    methods: ['GET', 'POST'],
}

app.use(cors(corsOptions));
app.use(express.json());

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});
app.use(limiter);
connectToDb();

app.use('/api/prospects', cors(corsOptions), prospectRoutes);

app.listen(process.env.PORT, () => {
    console.log(`Server started on port ${process.env.PORT}`);
});
