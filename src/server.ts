import express, { Application, Response } from 'express';
import dotenv from 'dotenv';
import { userRouter } from './users/users.routes';
import { ownerRouter } from './restaurant owner/owner.routes';
import { driverRouter } from './driver/driver.routes';
import { commentRouter } from './comments/comment.route';
import { logger } from './middleware/logger';
import { rateLimiterMiddleware } from './middleware/limiter';
import { authRouter } from './auth/auth.route';




dotenv.config(); 

const app:Application = express(); 

 
const PORT = process.env.PORT || 3000; 

app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));

app.use(logger);

// Rate Limiter Middleware
app.use(rateLimiterMiddleware);


//default route
app.get('/',(req,res:Response)=>{
    res.send('Welcome to Express API Backend with drizle ORM and PostgreSQL');
})
//Routes 
app.use('/api',userRouter);
app.use('/api',ownerRouter);
app.use('/api',driverRouter);
app.use('/api',commentRouter);
app.use('/api',authRouter);

//Start server
 
app.listen(PORT,()=>{
    console.log(`🚀 Server running on http://localhost:${PORT}`);
})