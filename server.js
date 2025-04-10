import express from 'express';
import ENV from './src/config/env.js';
import cookieParser from 'cookie-parser'; // To parse cookies in the request
import cors from 'cors'; // To enable Cross-Origin Resource Sharing (CORS)
import morgan from 'morgan';
import routes from './src/routes/index.js';
import errorHandler, {
  CustomError,
} from './src/utils/middleware/errorHandler.js';

const app = express();

// update

const allowedOrigins = new Set(
  process.env.CORS_ACCESS ? process.env.CORS_ACCESS.split(',') : []
);

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.has(origin)) {
      callback(null, true);
    } else {
      callback(new CustomError('Not allowed by CORS'));
    }
  },
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(morgan(':method :url :status :response-time ms'));

app.use('/api/v1', routes);

app.use(errorHandler);

const port = ENV.PORT || 3000;
app.listen(port, () => {
  console.log(`App is listening on http://localhost:${port}`);
});
