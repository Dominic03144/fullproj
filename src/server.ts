import express, { Application, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import userRouter from './users/users.routes';
import { ownerRouter } from './restaurant owner/owner.routes';
import { driverRouter } from './driver/driver.routes';
import { commentRouter } from './comments/comment.route';
import { authRouter } from './auth/auth.route';
import { ordersMenuItemRouter } from './order-Menu-Item/orderMenuItem.route';
import { ordersStatusRouter } from './order-Status/order-status.routes';
import { ordersRouter } from './orders/orders.router';
import { menuItemRouter } from './menuitem/menuitem.routes';
import { categoryRouter } from './category/category.route';
import { addressRouter } from './address/address.route';
import { restaurantRouter } from './restaurant/restaurant.route';
import { cityRouter } from './city/city.route';
import { stateRouter } from './state/state.route';
import { statusCatalogRouter } from './statusCatalog/statusCatalog.route';
import { logger } from './middleware/logger';
import { rateLimiterMiddleware } from './middleware/limiter';

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 3000;

// ✅ Enable CORS
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger);
app.use(rateLimiterMiddleware);

// Default route
app.get('/', (_req, res: Response) => {
  res.send('Welcome to Our Restaurant Management API');
});

// Routes
app.use('/api', userRouter);
app.use('/api', ownerRouter);
app.use('/api', driverRouter);
app.use('/api', commentRouter);
app.use('/api', authRouter);
app.use('/api', ordersMenuItemRouter);
app.use('/api', ordersRouter);
app.use('/api', ordersStatusRouter);
app.use('/api', menuItemRouter);
app.use('/api', categoryRouter);
app.use('/api', statusCatalogRouter);
app.use('/api', addressRouter);
app.use('/api', restaurantRouter);
app.use('/api', cityRouter);
app.use('/api', stateRouter);

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
