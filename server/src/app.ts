import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import {authenticateJWT} from './middleware/auth';
import listEndpoints from 'express-list-endpoints';

import openRoutesV1 from './routes/v1/open';
import closeRoutesV1 from './routes/v1/close';
import {dbClient, dbConnect} from "./db";
import {API_CLOSE_PATH_PREFIX, API_OPEN_PATH_PREFIX, API_V1} from "./routes/v1/api-paths";
import {login, register} from "./controllers/auth-controller";

const app = express();
const openRouter = express.Router();
const closeRouter = express.Router();
const PORT = process.env.PORT || 8080;

// Security & Standard Middleware
app.use(helmet()); // Secure HTTP headers
app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
    console.log(`[Incoming] ${req.method} ${req.url}`);
    next();
});

app.use(API_OPEN_PATH_PREFIX, openRouter);
openRouter.use(API_OPEN_PATH_PREFIX, openRoutesV1);

app.use(API_CLOSE_PATH_PREFIX, closeRouter);
closeRouter.use(API_CLOSE_PATH_PREFIX, authenticateJWT, closeRoutesV1);


openRouter.post(API_V1.OPEN.POST.REGISTER, (request, response) => {
    return register(request, response);
});

openRouter.post(API_V1.OPEN.POST.LOGIN, (request, response) => {
    return login(request, response);
});

const routes = listEndpoints(app);
console.table(routes.map(route => ({
    path: route.path,
    methods: route.methods.join(', '),
    middlewares: route.middlewares.join(', ')
})));

app.listen(PORT, async () => {
    await dbConnect();
    console.log(`Server running on port ${PORT}`);
    console.log(`Connected to DB`);
    console.log(`Environment: ${process.env.NODE_ENV}`);
});
