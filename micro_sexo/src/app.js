import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import rateLimit from 'express-rate-limit';

dotenv.config();

const app = express();

app.use(cors());
app.use(helmet());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 500 
});

app.use(limiter);

// Configura los proxies para tus APIs
app.use('/auth', createProxyMiddleware({ target: process.env.AUTH_API_URL, changeOrigin: true }));
app.use('/', createProxyMiddleware({ target: process.env.AUTH_API_URL, changeOrigin: true }));
export default app;